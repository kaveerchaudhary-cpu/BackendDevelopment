from django.test import TestCase
from django.urls import reverse
from unittest.mock import patch
import socket
import urllib.error
from .models import Student

from .utils import get_external_data


class StudentAPITestCase(TestCase):

    def test_health_check(self):
        response = self.client.get(reverse('health-check'))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['status'], 'ok')

    def test_student_detail(self):
        response = self.client.get(
            reverse('student-detail', args=[42])
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['student_id'], 42)
        self.assertEqual(response.json()['name'], 'Kabir Chaudhary')
        
    def test_student_detail_invalid_id(self):
        response = self.client.get('/api/students/abc/')

        self.assertEqual(response.status_code, 404)

    def test_student_list(self):
        response = self.client.get(reverse("student-list"))

        self.assertEqual(response.status_code, 200)

        students = response.json()["students"]
        self.assertEqual(len(students), 3)
        self.assertEqual(students[0]["name"], "Kabir Chaudhary")

        
    @patch("students.utils.urllib.request.urlopen")
    def test_external_service_timeout(self, mock_urlopen):
        mock_urlopen.side_effect = socket.timeout

        result = get_external_data(1)

        self.assertIsNone(result["data"])
        self.assertEqual(
            result["error"],
            "External service timed out",
        )
    @patch("students.utils.urllib.request.urlopen")
    def test_external_service_success(self, mock_urlopen):
        mock_response = (
            mock_urlopen.return_value.__enter__.return_value
        )
        mock_response.read.return_value = (
            b'{"student_id": 1, "name": "Kabir Chaudhary"}'
        )

        result = get_external_data(1)

        self.assertEqual(result["data"]["student_id"], 1)
        self.assertEqual(
            result["data"]["name"],
            "Kabir Chaudhary",
        )
        self.assertIsNone(result["error"])
class StudentModelTestCase(TestCase):

    def test_create_student(self):
        student = Student.objects.create(
            name="Kabir Chaudhary",
            course="Django",
        )

        self.assertEqual(student.name, "Kabir Chaudhary")
        self.assertEqual(student.course, "Django")

    def test_student_string_representation(self):
        student = Student(
            name="Kabir Chaudhary",
            course="Django",
        )

        self.assertEqual(str(student), "Kabir Chaudhary")

