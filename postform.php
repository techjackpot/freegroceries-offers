<?php

//Post form
/*echo '<pre>'; print_r($_REQUEST);
die();*/
header('Access-Control-Allow-Origin: *'); 
header("Access-Control-Allow-Credentials: true");
header('Access-Control-Allow-Methods: GET, PUT, POST, DELETE, OPTIONS');
header('Access-Control-Max-Age: 1000');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token , Authorization');


 $post_data['firstname'] = $_REQUEST['fname'];
 $post_data['lastname'] = $_REQUEST['fname'];  

// Special Name Fields 

$post_data['email'] = $_REQUEST['email'];


$post_data['mobile'] = $_REQUEST['mobile'];
// Special Phone Fields
$post_data['phone1'] = $_REQUEST['mobile'];
$post_data['phone'] = $_REQUEST['mobile'];

$post_data['street1'] = $_REQUEST['streetaddress'];
$post_data['citysuburb'] = $_REQUEST['citysuburb'];

// Other Address
$post_data['towncity'] = $_REQUEST['citysuburb'];
$post_data['streetaddress1'] = $_REQUEST['streetaddress'];


$post_data['state'] = $_REQUEST['state'];
// Additiona Address Fields
$post_data['county'] = $_REQUEST['state'];

$post_data['postcode'] = $_REQUEST['postcode'];
$post_data['birthyear'] = $_REQUEST['birth_year'];
$post_data['gender'] = $_REQUEST['gender'];

$post_data['campid'] = $_REQUEST['campid'];
$post_data['sid'] = $_REQUEST['sid'];
//$post_data['optional'] = $_REQUEST['optional'];
//$post_data['sub_id'] = $_REQUEST['sub_id'];
//$post_data['dob'] = $_REQUEST['dob'];

// Options
//$post_data['choice'] = $_REQUEST['optional'];
//$post_data['option_209'] = $_REQUEST['option_209'];

//IP Address
$post_data['ipaddress'] = $_SERVER['REMOTE_ADDR'];
$post_data['source'] = "http://www.freegroceries.com.au";


//echo $post_data[sid];

$offerurl = $_REQUEST['offerurl'];


//echo $_REQUEST['offerurl'];

//create array of data to be posted

//traverse array and prepare data for posting (key1=value1)
foreach ( $post_data as $key => $value) {
$post_items[] = $key . '=' . $value;
}

//create the final string to be posted using implode()
$post_string = implode ('&', $post_items);

//create cURL connection
$curl_connection = curl_init($offerurl);

//echo $offerurl;
//echo $post_string;

//echo " ";
//set options
curl_setopt($curl_connection, CURLOPT_CONNECTTIMEOUT, 30);
curl_setopt($curl_connection, CURLOPT_USERAGENT, "Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1)");
curl_setopt($curl_connection, CURLOPT_RETURNTRANSFER, true);
curl_setopt($curl_connection, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($curl_connection, CURLOPT_FOLLOWLOCATION, 1);

//set data to be posted
curl_setopt($curl_connection, CURLOPT_POSTFIELDS, $post_string);

//perform our request
//echo "Result=";
$result = curl_exec($curl_connection);
//echo htmlentities($result);
//show information regarding the request
//print_r(curl_getinfo($curl_connection));
//echo curl_errno($curl_connection) . '-' . curl_error($curl_connection);

echo $result;
//close the connection
curl_close($curl_connection);


//echo "Offer Sent";

?>
