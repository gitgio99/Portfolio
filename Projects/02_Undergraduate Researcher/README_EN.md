# KITTI_spoofing — README (English)

This repository provides utilities and Jupyter notebooks for spoofing attacks on KITTI dataset point clouds and images. The goal is to manipulate LiDAR and camera data for research and analysis.

## 1. Environment Setup
- Python 3.7–3.10 recommended
- Use Anaconda for environment management
```bash
conda create -n kitti-spoof python=3.9 -y
conda activate kitti-spoof
pip install -r requirements_kitti_spoofing.txt
```

## 2. Dataset Structure
Expected KITTI object dataset folder layout:
```
<KITTI_ROOT>/
  └─ training/
      ├─ image_2/
      ├─ velodyne/
      ├─ calib/
      └─ label_2/
```
Set `KITTI_ROOT` as environment variable.

## 3. Notebooks
- `bilateral_filter_org_png.ipynb`: Bilateral filtering experiments
- `kitti_image_lidar_compare.ipynb`: LiDAR-image projection
- `kitti_image_RGB_5channel.ipynb`: Generate 5-channel RGBD+Intensity
- `RGB_depth_matching_system.ipynb`: RGB–Depth alignment
- `final_empty_box_file.ipynb`: Remove points inside boxes
- `final_copy_paste_file.ipynb`: Copy–paste spoofing
- `spoof_each_box_file.ipynb`, `spoof_each_box_test_with_img.ipynb`: Per-box spoofing utilities

## 4. Usage
Run Jupyter Notebook:
```bash
jupyter notebook
```
Select notebook in `code/` and run cells top to bottom.

## 5. Recommendations
- Avoid hard-coded paths, use env vars
- Normalize depth/intensity before saving
- Use Git LFS for large files (.bin, .npy)

## 6. References
- [KITTI Dataset](https://www.cvlibs.net/datasets/kitti/)
- [OpenCV Bilateral Filter](https://docs.opencv.org/4.x/d4/d86/group__imgproc__filter.html)
- [Open3D Documentation](https://www.open3d.org/docs/release/)
