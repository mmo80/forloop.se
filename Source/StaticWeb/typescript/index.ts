import '../sass/app.scss';

// jQuery(function ($) {
//     $("#contact_form").submit(function () {
//         var email = $("#email").val();
//         var msg = $("#msg").val();
//         $.ajax({
//             type: "POST",
//             url: "/api/contact/sendmail",
//             data: {
//                 Email: email,
//                 Message: msg
//             }
//         })
//         .done(function (response) {
//             alert('Your message has been sent. Thank you!');
//             $("#email").val('');
//             $("#msg").val('');
//         })
//         .fail(function (response) {
//             alert('Error sending message.');
//         });
//         return false; // prevent page refresh
//     });
// });