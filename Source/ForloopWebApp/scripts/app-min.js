jQuery(function(a){a("#contact_form").submit(function(){var e=a("#email").val(),n=a("#msg").val();return a.ajax({type:"POST",url:"/api/contact/SendMail",data:{Email:e,Message:n}}).done(function(e){alert("Your message has been sent. Thank you!"),a("#email").val(""),a("#msg").val("")}).fail(function(a){alert("Error sending message.")}),!1})});
//# sourceMappingURL=maps/app-min.js.map
