from django.db import models
import uuid

class Class(models.Model):
    code = models.CharField(max_length=36, unique=True, default=uuid.uuid4)
    day = models.DateField()
    hour = models.TimeField()
    users_assigned = models.ManyToManyField('users.User', related_name='class_users', blank=True)

    def __str__(self):
        return f'Class {self.code} on {self.day} at {self.hour}'
