import json
import os
import hashlib
import secrets
import psycopg2

def get_conn():
    return psycopg2.connect(os.environ["DATABASE_URL"])

def hash_password(password, salt=None):
    if salt is None:
        salt = secrets.token_hex(16)
    hashed = hashlib.sha256((salt + password).encode()).hexdigest()
    return f"{salt}:{hashed}"

def verify_password(password, stored):
    salt, _ = stored.split(":")
    return hash_password(password, salt) == stored

def handler(event, context):
    """Регистрация и вход пользователей криптобиржи"""
    if event.get("httpMethod") == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
                "Access-Control-Max-Age": "86400",
            },
            "body": "",
        }

    headers = {"Access-Control-Allow-Origin": "*", "Content-Type": "application/json"}
    method = event.get("httpMethod", "GET")
    path = (event.get("queryStringParameters") or {}).get("action", "")

    if method != "POST":
        return {"statusCode": 405, "headers": headers, "body": json.dumps({"error": "Method not allowed"})}

    body = json.loads(event.get("body", "{}"))
    schema = os.environ.get("MAIN_DB_SCHEMA", "public")

    if path == "register":
        return register(body, headers, schema)
    elif path == "login":
        return login(body, headers, schema)
    elif path == "me":
        return get_me(body, headers, schema)
    else:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Unknown action"})}


def register(body, headers, schema):
    email = (body.get("email") or "").strip().lower()
    username = (body.get("username") or "").strip()
    password = body.get("password", "")

    if not email or not username or not password:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните все поля"})}
    if len(password) < 6:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Пароль минимум 6 символов"})}
    if len(username) < 3:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Имя минимум 3 символа"})}

    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id FROM {}.users WHERE email = '{}' OR username = '{}'".format(schema, email.replace("'", "''"), username.replace("'", "''")))
        if cur.fetchone():
            return {"statusCode": 409, "headers": headers, "body": json.dumps({"error": "Пользователь с таким email или именем уже существует"})}

        pw_hash = hash_password(password)
        token = secrets.token_hex(32)

        cur.execute(
            "INSERT INTO {}.users (email, username, password_hash) VALUES ('{}', '{}', '{}') RETURNING id".format(
                schema,
                email.replace("'", "''"),
                username.replace("'", "''"),
                pw_hash.replace("'", "''"),
            )
        )
        user_id = cur.fetchone()[0]

        cur.execute(
            "INSERT INTO {}.balances (user_id, currency, amount) VALUES ({}, 'BTC', 1.00000000)".format(schema, user_id)
        )

        conn.commit()

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "success": True,
                "user": {"id": user_id, "email": email, "username": username},
                "token": token,
                "balances": [{"currency": "BTC", "amount": "1.00000000"}],
            }),
        }
    finally:
        conn.close()


def login(body, headers, schema):
    email = (body.get("email") or "").strip().lower()
    password = body.get("password", "")

    if not email or not password:
        return {"statusCode": 400, "headers": headers, "body": json.dumps({"error": "Заполните все поля"})}

    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, email, username, password_hash FROM {}.users WHERE email = '{}'".format(schema, email.replace("'", "''")))
        row = cur.fetchone()
        if not row:
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный email или пароль"})}

        user_id, user_email, username, pw_hash = row
        if not verify_password(password, pw_hash):
            return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Неверный email или пароль"})}

        token = secrets.token_hex(32)

        cur.execute("SELECT currency, amount FROM {}.balances WHERE user_id = {}".format(schema, user_id))
        balances = [{"currency": r[0], "amount": str(r[1])} for r in cur.fetchall()]

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "success": True,
                "user": {"id": user_id, "email": user_email, "username": username},
                "token": token,
                "balances": balances,
            }),
        }
    finally:
        conn.close()


def get_me(body, headers, schema):
    user_id = body.get("user_id")
    if not user_id:
        return {"statusCode": 401, "headers": headers, "body": json.dumps({"error": "Не авторизован"})}

    conn = get_conn()
    try:
        cur = conn.cursor()
        cur.execute("SELECT id, email, username FROM {}.users WHERE id = {}".format(schema, int(user_id)))
        row = cur.fetchone()
        if not row:
            return {"statusCode": 404, "headers": headers, "body": json.dumps({"error": "Пользователь не найден"})}

        cur.execute("SELECT currency, amount FROM {}.balances WHERE user_id = {}".format(schema, int(user_id)))
        balances = [{"currency": r[0], "amount": str(r[1])} for r in cur.fetchall()]

        return {
            "statusCode": 200,
            "headers": headers,
            "body": json.dumps({
                "success": True,
                "user": {"id": row[0], "email": row[1], "username": row[2]},
                "balances": balances,
            }),
        }
    finally:
        conn.close()
