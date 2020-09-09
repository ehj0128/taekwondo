from PIL import Image


# req 1-1~2 이미지 파일 로드 및 정규화
def img_getter(paths, img_dir, x_size = 512, y_size = 512):
    # 이미지 파일경로, 일단 iterable 객체라고 가정
    for i in range(len(paths)):
        img = Image.open(img_dir + paths[i])
        resize.img = img.resize((x_size, y_size))
        resize_img.save()
    return data