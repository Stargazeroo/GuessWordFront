BIN_DEPS="cp lessc npm"

for i in $BIN_DEPS; do
    if ! type $i &> /dev/null; then
        echo -e "Error: Required program could not be found: $i"
        exit 1
    fi
done

$(npm install)
