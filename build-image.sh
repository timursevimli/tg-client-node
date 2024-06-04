#!/bin/bash

echo -n "Enter image name: "
read -r image_name

if [ -z "$image_name" ]
then
  echo "Image name do not empty"
  exit 1
fi

echo -n "Enter image version (default: 1.0): "
read -r ver
ver="${ver:-1.0}"

echo -n "Save images? (y/N): "
read -r save
save="${save:-N}"

operation_systems=("linux/amd64" "linux/arm64")

for os in "${operation_systems[@]}"
do
  echo "Building image for os: $os"
  docker build --platform $os -t ${image_name}-$os:$ver . 
done

if [[ $save =~ ^[Yy]$ ]]
then
  for tag in ${operation_systems[@]}
  do
    image=$image_name-$tag:$ver
    file=$image_name_${ver//./_}_${tag//\//_}.tar
    echo "Creating image file for $image"
    docker save -o $file $image
    echo "Image file succefully created by name: $file"
  done
  echo "All builds and saves completed successfully."
else
  echo "All builds completed successfully. Images will not be saved."
fi
