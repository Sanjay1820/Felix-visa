<?php
// PHP MAIL DIAGNOSTIC TOOL v1.0
header('Content-Type: application/json');

$to = 'sanjaythakor4973@gmail.com';
$subject = "Felix System Diagnostic";
$message = "This is a diagnostic test to verify if the server's PHP mail() function is enabled and working.";
$headers = "From: system-diagnostic@felixbysagar.com";

$mail_enabled = function_exists('mail');
$send_status = false;
$error = 'None';

if ($mail_enabled) {
    if (@mail($to, $subject, $message, $headers)) {
        $send_status = true;
    } else {
        $error = error_get_last()['message'] ?? 'Unknown mail() error';
    }
} else {
    $error = 'The mail() function is DISABLED on this server.';
}

echo json_encode([
    'php_version' => phpversion(),
    'mail_function_exists' => $mail_enabled,
    'transmission_success' => $send_status,
    'error_log' => $error,
    'server_software' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
]);
?>