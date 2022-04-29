import os

from tinydb import TinyDB
from tinydb.table import Document

DELETED_SIZE_DOC_ID = 1


class Database(object):
    def __init__(self):
        config_dir = os.environ.get("CONFIG_DIR", "")  # Will be set by Dockerfile
        self.db = TinyDB(os.path.join(config_dir, 'db.json'))

    def set_deleted_size(self, library_name, deleted_size):
        self.db.upsert(Document({
            library_name: deleted_size
        }, doc_id=DELETED_SIZE_DOC_ID))

    def get_deleted_size(self, library_name):
        data = self.db.get(doc_id=DELETED_SIZE_DOC_ID)
        if data is not None:
            if library_name in data:
                return data[library_name]
        return 0


