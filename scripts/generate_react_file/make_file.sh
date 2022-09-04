#!/bin/bash

project_path=$(pwd)
new_folder_path="$project_path/$1"

mkdir -p "$new_folder_path"
# count_slash=`expr "$(echo "$new_folder_path" | grep -o "/" | wc -l | sed "s/ //g")" \+ 1`
# name_folder="$(echo "$new_folder_path" | cut -d '/' -f $count_slash | perl -pe 's#(_|^)(.)#\u$2#g')"
name_folder="$(echo "${1##*/}")"
name_folder_camelcase="$(echo "${1##*/}" | perl -pe 's#(_|-|\.|^)(.)#\u$2#g')"
file_init_path="$(echo $0 | sed "s/\/${0##*/}//g")"

cat "$file_init_path/index.txt" | sed "s/index/$name_folder_camelcase/g" | sed "s/Props/"$name_folder_camelcase'Props'"/g" | sed "s/Styles/"$name_folder_camelcase'Styles'"/g" > "$new_folder_path/index.tsx"
cat "$file_init_path/types.txt" | sed "s/Props/"$name_folder_camelcase'Props'"/g" > "$new_folder_path/types.ts"
cat "$file_init_path/styles.txt" | sed "s/Styles/"$name_folder_camelcase'Styles'"/g" > "$new_folder_path/styles.ts"
# echo $file_init_path

echo "💥💥💥 create folder $new_folder_path finished 💥💥💥"