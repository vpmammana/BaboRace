find | sed 's/\.\///g' | sed 's/_grande\.png//g' | awk '{ print "convert " $1 "_grande.png -resize 200x ../php/imagens/"$1".png"}' > executa_reduz_tamanho_img.bash
