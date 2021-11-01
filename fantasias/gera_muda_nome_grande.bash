find | sed 's/\.\///g' | awk 'BEGIN{FS="."}{print "mv "$0" " $1"_grande.png"}' > executa_muda_nome.bash
