from django.shortcuts import get_object_or_404
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import UserSerializer

# Create your views here.
@api_view(['GET', 'DELETE', 'PUT'])
def detail_or_delete_or_update(request, user_id):
    User = get_user_model()
    user = get_object_or_404(User, id=user_id)
    serializer = UserSerializer(user)

    # 조회
    if request.method == 'GET':
        return Response({"status": "OK", "data": serializer.data})

    if request.user.is_authenticated:
        # 삭제
        if request.method == 'DELETE':
            if request.user == user:
                request.user.delete()
                return Response({"status": "OK", **serializer.data})
            else:
                return Response({"status": "FAIL", "error_msg": "삭제 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)

        # 수정
        else:
            if request.user == user:
                serializer = UserSerializer(user, data=request.data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return Response({"status": "OK", "data": serializer.data})
            else:
                return Response({"status": "FAIL", "error_msg": "수정 권한이 없습니다."}, status=status.HTTP_403_FORBIDDEN)
    else:
        return Response({"status": "FAIL", "error_msg": "로그인이 필요한 서비스 입니다."}, status=status.HTTP_401_UNAUTHORIZED)
        