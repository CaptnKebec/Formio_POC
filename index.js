import axios from "axios";
import fs from "fs";
var _loaded = {};

async function main() {
	const baseUrl = "https://devformioapi.hema-quebec.qc.ca/api-dev";

	const data = {
		data: {
			email: "admin@example.com",
			password: "CHANGEME",
		},
	};

	try {
		const res = await axios.post(baseUrl + "user/login", data);
		console.log(res.data); // Logging the received data
		//  const token = res.headers['x-jwt-token'];
		//  const config = {
		//       headers: {
		//           'x-jwt-token': token
		//        }
		//    };
		//  const res2 = await axios.get(baseUrl + 'contact/submission', config);

		/*    const adminData = {
            data: {
                email: "",
                password: ""
            }
        };
         const adminConfig = {
            headers: {
                "Content-Type": "application/json"
            }
        };

        const res3 = await axios.post(baseUrl + 'admin/login', adminData,adminConfig);

        console.log(res3.data); // Logging the received data
        const tokenAdmin = res3.headers['x-jwt-token'];

         // Get Download Token
         const downloadTokenHeaders = {
            headers: {
                'x-jwt-token': tokenAdmin,
                'x-expire': 3600,
                'x-allow': 'GET:/project/65046e578d4468f06fe23533/form/650836db8d4468f06fe2577c/submission/650836ea8d4468f06fe25866/download'
            }
        }
        const downloadToken = await axios.get('https://hq-dev-formio-wa.azurewebsites.net/project/65046e578d4468f06fe23533/' + 'token', downloadTokenHeaders);
        console.log(downloadToken.data)
 
        const res4 = await axios({
            method: 'get',
            url: baseUrl + 'form/650836db8d4468f06fe2577c/submission/650836ea8d4468f06fe25866/download?token=' + downloadToken.data.key,
            responseType: 'arraybuffer',  // This is important
            responseEncoding: 'binary'    // This is important
        });
 
        fs.writeFileSync('contact_650836ea8d4468f06fe25866.pdf', res4.data);
        console.log('PDF file successfully downloaded and saved!'); */
		// res2.data.forEach((submission: any) => {

		//     console.log(submission.data);
		// });
	} catch (err) {
		console.error(err); // Logging the error if any occur during the request
	}
}

main().catch((err) => console.log(err));


function addScript(url) {
  if (!loaded[url]) {
    var s = document.createElement('script');
    s.src = url;
    document.head.appendChild(s);
    _loaded[url] = true;
  }
}
