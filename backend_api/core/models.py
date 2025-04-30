from django.db import models

class Internship(models.Model):
    company = models.CharField(max_length=255)
    title = models.CharField(max_length=255)
    description = models.TextField()
    date = models.CharField(max_length=100)
    viewed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title} — {self.company}"
