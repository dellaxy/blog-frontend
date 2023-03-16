from PIL import Image
import os

directory = "D:/Files/Projekty/Blog/discord-diary/src/assets/images"
output_directory = "D:/Files/Projekty/Blog/discord-diary/src/assets/images"

compression_level = 100


for filename in os.listdir(directory):

    if filename.endswith(".jpg") or filename.endswith(".jpeg") or filename.endswith(".png"):

        if os.path.getsize(os.path.join(directory, filename)) > 1000000:
            image = Image.open(os.path.join(directory, filename))
            print("Compressing " + filename + "...")

            image.save(os.path.join(output_directory, filename),
                       optimize=True, quality=compression_level)
