<?php
// ROBUST ELITE MAILER v2.5 - FINAL FIX
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

    // 1. DATA EXTRACTION
    $name = htmlspecialchars($data['name'] ?? 'Not provided');
    $email = htmlspecialchars($data['email'] ?? 'Not provided');
    $destination = htmlspecialchars($data['destination'] ?? 'Not provided');
    $category = htmlspecialchars($data['category'] ?? 'Not provided');
    $qualification = htmlspecialchars($data['qualification'] ?? 'Not provided');
    $brief = htmlspecialchars($data['brief'] ?? 'Not provided');

    $to = 'sanjaythakor4973@gmail.com';
    $subject = "Assessment Portal: $name";

    // 2. PREMIUM HTML TEMPLATE
    $message = "
    <html>
    <body style='background-color: #010611; color: #ffffff; padding: 40px; font-family: Arial, sans-serif;'>
        <div style='background-color: #0b1b36; border: 2px solid #d4af37; border-radius: 20px; padding: 40px; max-width: 600px; margin: 0 auto;'>
            <h1 style='color: #d4af37; text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px;'>MISSION INTEL</h1>
            <p><strong>Name:</strong> $name</p>
            <p><strong>Email:</strong> $email</p>
            <p><strong>Destination:</strong> $destination</p>
            <p><strong>Category:</strong> $category</p>
            <p><strong>Qualification:</strong> $qualification</p>
            <p style='background: rgba(255,255,255,0.05); padding: 15px; border-radius: 10px;'><strong>Brief:</strong><br>$brief</p>
            <div style='text-align: center; color: #555; font-size: 10px; margin-top: 30px;'>FILIX GLOBAL TRANSMISSION</div>
        </div>
    </body>
    </html>";

    // 3. ROBUST HEADERS (Crucial for GoDaddy/Shared Hosting)
    // We use a clean 'From' address that matches common server configs
    $from_mail = "noreply@" . ($_SERVER['SERVER_NAME'] ?? 'filixbysagar.com');
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";
    $headers .= "From: Filix System <$from_mail>" . "\r\n";
    $headers .= "Reply-To: $email" . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // 4. TRANSMISSION ATTEMPT
    // We try to send and return the result properly
    if (mail($to, $subject, $message, $headers)) {
        echo json_encode(['status' => 'success', 'message' => 'Transmission complete']);
    } else {
        // Fallback for servers requiring simplified headers
        $simple_headers = "From: $from_mail" . "\r\n" . "Reply-To: $email";
        if (mail($to, $subject, strip_tags($message), $simple_headers)) {
            echo json_encode(['status' => 'success', 'message' => 'Transmission complete (Simplified Mode)']);
        } else {
            http_response_code(500);
            echo json_encode(['status' => 'error', 'message' => 'MTA failure. Server cannot send mail.']);
        }
    }
}
?>