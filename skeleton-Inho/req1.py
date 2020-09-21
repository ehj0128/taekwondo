from PIL import Image


# req 1-1~2 이미지 파일 로드 및 정규화
# 일단 정규화 된 폴더에서 해당 파일을 불러오고, 없으면 (except) 원본폴더에서 불러와 정규화시킨뒤 저장후 불러온다.
def img_getter(paths, img_dir, x_size = 512, y_size = 512):
    # 이미지 파일경로, 일단 iterable 객체라고 가정
    for i in range(len(paths)):
        img = Image.open(img_dir + paths[i])
        resize.img = img.resize((x_size, y_size))
        resize_img.save()
    return data