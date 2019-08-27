<?php
require_once 'src/plugin-updater.php';

$gitlab_conn = new Moenus\GitLabUpdater\PluginUpdater( [
		'slug' => 'flo-launch',
		'plugin_base_name' => 'flo-launch/flo-launch.php',
		'access_token' => 'FCNy2qiZeVdPMhRC5_r2', //'pcDs1UK1meSyxnRn8k6K',
		'gitlab_url' => 'https://gitlab.com',
		'repo' => '13319518',
] );
