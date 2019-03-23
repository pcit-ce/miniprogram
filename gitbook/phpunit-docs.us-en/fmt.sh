pages="annotations \
       incomplete-and-skipped-tests \
       other-uses-for-tests \
       assertions \
       copyright \
       risky-tests \
       bibliography \
       index \
       test-doubles \
       book \
       database \
       installation \
       testing-practices \
       code-coverage-analysis \
       extending-phpunit \
       logging \
       textui \
       configuration \
       fixtures \
       organizing-tests \
       writing-tests-for-phpunit"

for page in $pages
do
pandoc -f rst -t markdown -o ${page}.md ${page}.rst
done

sed -i "s#.. code-block:: #\`\`\`\n\`\`\`#g" writing-tests-for-phpunit.md

sed -i 's!\\#\.!!g' writing-tests-for-phpunit.md

sed -i 's#\\\*#\*#g' writing-tests-for-phpunit.md

sed -i 's#&lt;?php#<?php#g' writing-tests-for-phpunit.md

sed -i 's#&gt;#>#g' writing-tests-for-phpunit.md

sed -i 's#\\\$#\$#g' writing-tests-for-phpunit.md

sed -i 's#\\\[#\[#g' writing-tests-for-phpunit.md

sed -i 's#\\\]#\]#g' writing-tests-for-phpunit.md

sed -i 's#\\_#_#g' writing-tests-for-phpunit.md

npm -g list @prettier/plugin-php || npm -g i @prettier/plugin-php

command -v prettier && prettier --write --plugin=/usr/local/node/lib/node_modules/@prettier/plugin-php *.md
