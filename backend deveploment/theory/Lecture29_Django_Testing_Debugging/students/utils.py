import json
import logging
import urllib.error
import urllib.request

logger = logging.getLogger(__name__)


def get_external_data(student_id):
    try:
        url = f"https://example.com/students/{student_id}"

        with urllib.request.urlopen(url, timeout=5) as response:
            data = json.loads(response.read().decode("utf-8"))

        return {
            "data": data,
            "error": None,
        }

    except (TimeoutError, urllib.error.URLError) as exc:
        if isinstance(exc, TimeoutError) or isinstance(
            getattr(exc, "reason", None), TimeoutError
        ):
            return {
                "data": None,
                "error": "External service timed out",
            }

        return {
            "data": None,
            "error": "External service error",
        }

    except (json.JSONDecodeError, urllib.error.HTTPError):
        return {
            "data": None,
            "error": "External service error",
        }
    except (TimeoutError, urllib.error.URLError) as exc:
     logger.error("External service request failed: %s", exc)

    if isinstance(exc, TimeoutError) or isinstance(
        getattr(exc, "reason", None), TimeoutError
    ):
        return {
            "data": None,
            "error": "External service timed out",
        }

    return {
        "data": None,
        "error": "External service error",
    }

