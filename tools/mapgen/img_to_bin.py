from multiprocessing.dummy import Array
import cv2
import numpy as np

def show(x):
  import matplotlib.pyplot as plt
  plt.imshow(x)
  plt.show()

if __name__ == '__main__':
  img_path = 'img/europe2.png'
  img = cv2.imread(img_path, 0) # 0 for greyscale

  # [print(r) for r in img]

  # convert to binary: 1=land 0=sea
  for i in range(0, img.shape[0]):
    for j in range(0, img.shape[1]):
      img[i,j] = 1 if img[i,j] > 130 else 0

  show(img)

  np.savetxt(
    'csv/europe_bin.csv', 
    img, 
    fmt='%i', 
    delimiter=',', 
    # newline=']\n[', 
  )