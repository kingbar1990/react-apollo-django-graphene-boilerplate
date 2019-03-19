# -*- coding: utf-8 -*-
# snapshottest: v1 - https://goo.gl/zC4yUc
from __future__ import unicode_literals

from snapshottest import Snapshot


snapshots = Snapshot()

snapshots['test_create_tast_mutation1 1'] = {
    'data': {
        'createTask': {
            'error': None,
            'task': {
                'assignedTo': {
                    'id': '1'
                },
                'description': 'DESC',
                'estimatedTime': 2,
                'id': '1',
                'name': 'New task',
                'status': 1
            }
        }
    }
}
