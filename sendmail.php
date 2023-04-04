<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Expection;

require 'phpmailer/src/Expection.php';
require 'phpmailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('ru', 'phpmailer/language/');
$mail->IsHTML(true);

$mail->setForm('info@fls.guru', 'ОТПРАВКА ФОРМЫ');
$mail->addAdress('merzhievskiy@gmail.com');
$mail->Subject = 'Hi its testmassage';

$body = '<h1>Встречай письмо</h1>';

if(trim(!empty($_POST['name']))){
	$body.='<><strong>Имя:</strong>' .$_POST['name'].'</p>';
}

if(trim(!empty($_POST['email']))){
	$body.='<><strong>email:</strong>' .$_POST['email'].'</p>';
}

$mail->body = $body;

if (!$mail->send()){
	$massage = 'eroor';
} else {
	$massage = 'send info';
}

$response = ['massage' => $massage];

header('Content-type: application/json');
echo json_endcode($response);
?>