#!/bin/sh
set -e

php bin/console doctrine:migrations:migrate --no-interaction
php bin/console pocket-grimoire:import --type=teams,editions,characters,jinxes --locale=en_GB --new=yes

exec php-fpm
