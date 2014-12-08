from django.db import models

# Create your models here.
class Host_info(models.Model):

    ip = models.CharField(max_length=20,unique = True)
    mac = models.CharField(max_length=20,blank=True,unique = True, primary_key=True)
    status = models.CharField(max_length=20)
    description = models.CharField(max_length=255, blank=False)
    def __str__(self):
        return self.mac
    class Meta:
        ordering = ["ip"]
