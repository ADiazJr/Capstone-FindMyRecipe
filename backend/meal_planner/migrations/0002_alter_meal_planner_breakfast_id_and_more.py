# Generated by Django 4.0.4 on 2023-02-13 17:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('meal_planner', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal_planner',
            name='breakfast_id',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='meal_planner',
            name='dinner_id',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='meal_planner',
            name='lunch_id',
            field=models.CharField(max_length=255, null=True),
        ),
    ]
