const functionUrl = 'https://us-central1-level-library-468217-r5.cloudfunctions.net/receiveLeadData';

// Payload provided by the user for testing
const payload = {
  "phone": "7202012313",
  "raw_contact": {
    "url": "https://denver.craigslist.org/sks/d/westminster-all-american-lock-and-key/7876040855.html",
    "post_id": "7876040855",
    "image_hash": "06s04Q",
    "original_category": "skilled trade services",
    "body_text": "QR Code Link to This Post\\n\\nSee our site \\\"All American Lock and Key Denver com\\\"\\n\\n720-201-2313 Call now! Full service Locksmith including car keys, home residential and commercial business lock work.\\n\\nColorado native - family owned business since 2006\\n\\nWe meet you at your location and perform the work! Hours: M-F 9am to 6:30pm by appointment\\n\\n*Deadbolts\\n*lock outs\\n*Car Keys and fobs\\n*Car key programming, chip keys\\n*duplicate keys\\n*master keys, valet keys, restricted keys\\n*High security keys\\n*Laser cut keys, sidewinder keys\\n*Many types of locks and keys: mailbox, Thule, Yakima, file cabinet etc.\\n\\n720-201-2313 See our site \\\"All American Lock and Key Denver com\\\" (Sorry no text, voice only)\\n\\nOur technician has passed a background check, is a Certified Locksmith through a vocational school, and we are insured and Bonded. Professional and friendly too!\\n\\n#locksmithnearby #locksmithnearme #DenverCarKeys #findatrustworthylocksmith #westminster #Denver #Arvada #thornton #carkeyreplacement #chipkeys #carkeyprogramming #newdeadbolt #keyscut",
    "business_name": "All American Lock and Key Denver",
    "category": "Locksmith",
    "services_rendered": "Full service Locksmith including car keys, home residential and commercial business lock work.",
    "name": null,
    "name_confidence": 0,
    "email": null,
    "phone": "7202012313",
    "website_url": null
  }
};

async function testReceiveLeadData() {
    console.log('Sending payload:', JSON.stringify(payload, null, 2));
    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
            timeout: 10000 // 10 seconds timeout
        });

        console.log('Response Status:', response.status);
        const responseText = await response.text();
        console.log('Response Body:', responseText);

        if (!response.ok) {
            console.error('Function returned an error status.');
        }
    } catch (error) {
        console.error('Error sending request:', error);
        if (error.name === 'FetchError' && error.code === 'ETIMEDOUT') {
            console.error('The request timed out. This might indicate the function is not returning a response.');
        }
    }
}

testReceiveLeadData();
