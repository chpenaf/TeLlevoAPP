# Generated by Django 3.2.8 on 2021-11-03 00:03

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_user_avatar'),
    ]

    operations = [
        migrations.CreateModel(
            name='DriverTrip',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('origen', models.CharField(max_length=500, verbose_name='Origen')),
                ('destino', models.CharField(max_length=500, verbose_name='Destino')),
                ('hora_salida', models.TimeField(verbose_name='Hora Salida')),
                ('fecha_salida', models.DateField(verbose_name='Fecha')),
                ('cantidad_pasajeros', models.IntegerField(default=4, verbose_name='Cantidad pasajeros')),
                ('driver', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('pasajeros', models.ManyToManyField(related_name='usuario_pasajero', to=settings.AUTH_USER_MODEL, verbose_name='Pasajeros')),
            ],
            options={
                'verbose_name': 'Viaje conductor',
                'verbose_name_plural': 'Viajes conductores',
            },
        ),
    ]
