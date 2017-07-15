<?php

//Post form
/*echo '<pre>'; print_r($_REQUEST);
die();*/
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


$matchset = array(
	// 'fname' => 'First',
	// 'lname' => 'Last',
	// 'email' => 'Email',
	// 'mobile' => array('mobile', 'phone1', 'phone'),
	// 'streetaddress' => array('street1', 'streetaddress1'),
	// 'citysuburb' => array('citysuburb', 'towncity'),
	// 'state' => 'state',
	// 'postcode' => 'postcode',
	// 'birth_year' => 'birthyear',
	// 'gender' => 'gender',
	// 'offerurl' => '',
	// 'sid' => 'sid',
	// 'campid' => 'campid',
	// 'dob' => 'Dob'
);

$post_data = array();

foreach($_REQUEST as $key => $value) {
	if(isset($matchset[$key])) {
		if(is_array($matchset[$key])) {
			foreach($matchset[$key] as $duplicate) {
				$post_data[$duplicate] = $value;
			}
		} elseif ($matchset[$key]) {
			$post_data[$matchset[$key]] = $value;
		}
	} else {
		$post_data[$key] = $value;
	}
}

$post_data['IP'] = '192.168.0.1';//$_SERVER['REMOTE_ADDR'];
$post_data['SourceURL'] = "http://www.freegroceries.com.au";

$offerurl = $_REQUEST['offerurl'];

$urlinfo = parse_url($offerurl);
if(isset($urlinfo['query'])) {
	parse_str($urlinfo['query'], $queries);
	$post_data = array_merge($post_data, $queries);
}
var_dump($post_data);

$offerurl = $urlinfo['scheme'].'://'.$urlinfo['host'].(isset($urlinfo['path'])?$urlinfo['path']:'/').'?'.http_build_query($post_data);

$curl_connection = curl_init($offerurl);
curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($curl_connection, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
// curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, 1);
// curl_setopt($curl_connection, CURLOPT_POSTFIELDS, http_build_query($post_data));

$result = curl_exec($curl_connection);

echo $result;
curl_close($curl_connection);

?>