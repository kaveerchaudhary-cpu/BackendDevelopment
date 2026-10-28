
from django.http import JsonResponse


def health_check(request):
    return JsonResponse({
        "status": "ok"
    })


def student_detail(request, student_id):
    return JsonResponse({
        "student_id": student_id,
        "name": "Kabir Chaudhary",
        "course": "Django"
    })


def student_list(request):
    students = [
        {"student_id": 1, "name": "Kabir Chaudhary"},
        {"student_id": 2, "name": "Aman Sharma"},
        {"student_id": 3, "name": "Priya Singh"},
    ]

    return JsonResponse({"students": students})
