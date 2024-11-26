# # import sys
# # from model import CSRNet
# # import torch
# # from torchvision import transforms
# # import os
# # import matplotlib.pyplot as plt
# # import numpy as np
# # from PIL import Image
# # from matplotlib import cm as c

# # # Define transformations
# # transform = transforms.Compose([
# #     transforms.ToTensor(),
# #     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
# # ])

# # # Load model and weights
# # model = CSRNet()
# # checkpoint = torch.load('weights.pth', map_location="cpu")
# # model.load_state_dict(checkpoint)

# # # Load image path from command line
# # img_path = sys.argv[1]

# # # Process image
# # img = transform(Image.open(img_path).convert('RGB'))
# # output = model(img.unsqueeze(0))

# # # Generate output image path
# # output_dir = "output"
# # print("Predicted Count: ", int(output.detach().cpu().sum().numpy()))
# # os.makedirs(output_dir, exist_ok=True)
# # filename_base = os.path.splitext(os.path.basename(img_path))[0]
# # output_image_path = os.path.join(output_dir, f"{filename_base}_plot.png")

# # # Process output and save image
# # temp = np.asarray(output.detach().cpu().reshape(output.shape[2], output.shape[3]))
# # plt.imsave(output_image_path, temp, cmap=c.jet)

# # print(f"Output image saved in '{output_image_path}'.")

# import sys
# import json
# import os
# import torch
# from model import CSRNet
# from torchvision import transforms
# import matplotlib.pyplot as plt
# import numpy as np
# from PIL import Image
# from matplotlib import cm as c

# # Define transformations
# transform = transforms.Compose([
#     transforms.ToTensor(),
#     transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
# ])

# # Load model and weights
# model = CSRNet()
# checkpoint = torch.load('weights.pth', map_location="cpu")
# model.load_state_dict(checkpoint)

# # Load image path from command line
# img_path = sys.argv[1]

# # Process image
# img = transform(Image.open(img_path).convert('RGB'))
# output = model(img.unsqueeze(0))

# # Calculate predicted count
# predicted_count = int(output.detach().cpu().sum().numpy())
# print("Predicted Count:", predicted_count)

# # Generate output image path
# output_dir = "output"
# os.makedirs(output_dir, exist_ok=True)
# filename_base = os.path.splitext(os.path.basename(img_path))[0]
# output_image_path = os.path.join(output_dir, f"{filename_base}_plot.png")

# # Process output and save image
# temp = np.asarray(output.detach().cpu().reshape(output.shape[2], output.shape[3]))
# plt.imsave(output_image_path, temp, cmap=c.jet)
# print(f"Output image saved in '{output_image_path}'.")

# # Save predicted count as JSON
# predicted_count_dir = "predictedCount"
# os.makedirs(predicted_count_dir, exist_ok=True)
# predicted_count_path = os.path.join(predicted_count_dir, f"{filename_base}_predict.json")
# with open(predicted_count_path, 'w') as json_file:
#     json.dump({"predicted_count": predicted_count}, json_file)
# print(f"Predicted count saved in '{predicted_count_path}'.")

import sys
import json
import os
import torch
from model import CSRNet
from torchvision import transforms
import matplotlib.pyplot as plt
import numpy as np
from PIL import Image
from matplotlib import cm as c

# Define transformations
transform = transforms.Compose([
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
])

# Load model and weights
model = CSRNet()
checkpoint = torch.load('weights.pth', map_location="cpu")
model.load_state_dict(checkpoint)

# Load image path and file index from command line
img_path = sys.argv[1]
file_index = sys.argv[2]

# Process image
img = transform(Image.open(img_path).convert('RGB'))
output = model(img.unsqueeze(0))

# Calculate predicted count
predicted_count = int(output.detach().cpu().sum().numpy())
print("Predicted Count:", predicted_count)

# Generate output file paths with sequential file index
output_dir = "output"
os.makedirs(output_dir, exist_ok=True)
output_image_path = os.path.join(output_dir, f"{file_index}.png")

# Process output and save image
temp = np.asarray(output.detach().cpu().reshape(output.shape[2], output.shape[3]))
plt.imsave(output_image_path, temp, cmap=c.jet)
print(f"Output image saved in '{output_image_path}'.")

# Save predicted count as a text file
predicted_count_dir = "predictedCount"
os.makedirs(predicted_count_dir, exist_ok=True)
predicted_count_path = os.path.join(predicted_count_dir, f"{file_index}.txt")
with open(predicted_count_path, 'w') as json_file:
    json.dump({"predicted_count": predicted_count}, json_file)
print(f"Predicted count saved in '{predicted_count_path}'.")
