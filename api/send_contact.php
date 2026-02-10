<?php
// ROBUST CONTACT MAILER v2.5 - FINAL FIX
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = file_get_contents('php://input');
    $data = json_decode($input, true);

    $name = htmlspecialchars($data['name'] ?? 'Not provided');
    $email = htmlspecialchars($data['email'] ?? 'Not provided');
    $phone = htmlspecialchars($data['phone'] ?? 'Not provided');
    $destination = htmlspecialchars($data['destination'] ?? 'Not provided');
    $message_text = htmlspecialchars($data['message'] ?? 'Not provided');

    $to = 'sanjaythakor4973@gmail.com';
    $subject = "Contact Inquiry: $name";

    $message = "
    <html>
    <body style='background-color: #010611; color: #ffffff; padding: 40px; font-family: Arial, sans-serif;'>
        <div style='background-color: #0b1b36; border: 1px solid #d4af37; border-radius: 20px; padding: 40px; max-width: 600px; margin: 0 auto;'>
            <h1 style='color: #d4af37; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px;'>CONTACT REQUEST</h1>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Phone:</strong> $phone</p>
            <p><strong>Destination:</strong> $destination</p>
            <p style='background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;'><strong>Notes:</strong><br>$message_text</p>
        </div>
    </body>
    </html>";

    $from_mail = "noreply@" . ($_SERVER['SERVER_NAME'] ?? 'felixbysagar.com');
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Felix Contact <$from_mail>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";

    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Transmission complete']);
    } else {
        $simple_headers = "From: $from_mail" . "\r\n" . "Reply-To: $email";
        if (mail($to, $subject, strip_tags($message), $simple_headers)) {
            echo json_encode(['status' => 'success', 'message' => 'Transmission complete (Simplified Mode)']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'MTA failure']);
        }
    }
}
?>