from psycopg_pool import ConnectionPool
from psycopg.rows import dict_row

from config import settings

# Small pool: Neon's free tier caps connections, and this API serves one admin
# plus a build step, not live traffic.
pool = ConnectionPool(
    settings.database_url,
    min_size=1,
    max_size=4,
    kwargs={"row_factory": dict_row},
    open=False,
)


def get_conn():
    with pool.connection() as conn:
        yield conn
