TC1	Valid login	Log in as standard_user / secret_sauce	Lands on inventory page, 6 products shown
TC2	Locked-out user	Log in as locked_out_user	Error message says the user is locked out
TC3	Wrong password	Valid user, bad password	Error shown, stays on login page
TC4	Add to cart	Log in, add first product	Cart badge shows 1
TC5	Checkout without info	Go to checkout, leave fields empty	Validation error on first name
TC6	Full purchase	Add item, complete checkout	"Thank you for your order" page
