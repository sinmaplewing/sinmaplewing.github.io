<?php
define('DB_NAME', 'knightzone_wordpress');
define('DB_USER', 'wordpress');
define('DB_PASSWORD', 'localdev');
define('DB_HOST', 'db');
define('DB_CHARSET', 'utf8');
define('DB_COLLATE', 'utf8_unicode_ci');

define('USE_MYSQL', true);

define('AUTH_KEY',         '-WT4|}JxTj#H,+q.:))8h #_=o<k648Bq9OG5&FrA}/wbZ#V )(e1gMVy$0ZUz|X');
define('SECURE_AUTH_KEY',  'HP=2S;2mGr;-I%&o|n1rY>((-qk2<9xCVP+GLFydU1LaNa,[bF-/od6y+>?0o+O<');
define('LOGGED_IN_KEY',    'D?^E,q?o:9#{,{p8(!mG|jFb9G/*INCXfi8*~V+-R:I`LYoSQ+Qj=Qs*EOTjdugF');
define('NONCE_KEY',        '-y7Mq.{W@!A)V#h2*rNci4s_K{kmFH=ICtOkhqI0f!(@+;,!) Y+GgM+%Xt=nI^r');
define('AUTH_SALT',        'tyTx<FQO8L--iuM|*#4ZHnUT?yw`/D{?E?Mz{QhY7/F!!uydud|4-|u6@R+wqBT8');
define('SECURE_AUTH_SALT', '4DQqn_3fsX4]n3nASxlaAg%KFLv8lb+OYXDv9tkugZU-2+aivc|K|;Eg{L2c(b2M');
define('LOGGED_IN_SALT',   'MY)*d#8PU-|<B_+q|hVu&Xnz4JAc]H5ZM5!]O~P4GUS#mpI%;{Sg<-+QhU+FP.J,');
define('NONCE_SALT',       'H#p* s*ppc_*-!Cu[4/R9Y+Q~~IEBcJn(.0A?%a+96hb;U]kaR8?#q>)0Ruv;+#:');

$table_prefix = 'wp_';

define('WPLANG', 'zh_TW');

define('WP_HOME',    'http://localhost:8080');
define('WP_SITEURL', 'http://localhost:8080');

define('WP_DEBUG', true);
define('WP_DEBUG_DISPLAY', false);
define('WP_DEBUG_LOG', true);

define('FS_METHOD', 'direct');
define('WP_MEMORY_LIMIT', '256M');
define('DISALLOW_FILE_MODS', true);

if ( !defined('ABSPATH') )
    define('ABSPATH', dirname(__FILE__) . '/');

require_once(ABSPATH . 'wp-settings.php');
