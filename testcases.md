TC1	Valid login	Log in as standard_user / secret_sauce	Lands on inventory page, 6 products shown
TC2	Locked-out user	Log in as locked_out_user	Error message says the user is locked out
TC3	Wrong password	Valid user, bad password	Error shown, stays on login page
TC4	Add to cart	Log in, add first product	Cart badge shows 1
TC5	Checkout without info	Go to checkout, leave fields empty	Validation error on first name
TC6	Full purchase	Add item, complete checkout	"Thank you for your order" page
TC7	Checkout total	Add 3 items, go to checkout overview	Item total + tax equals Total
TC8	Problem user	Log in as problem_user	Product images are broken (known bug, expected to fail)
TC9	Visual regression	Log in as visual_user, compare inventory screenshot with standard_user baseline	Screenshot differs from baseline
TC10	Data-driven login	Log in as each of the 6 users	Each user gets its expected outcome
TC11	Images blocked	Block image requests, log in	Inventory still works, 6 products shown
TC12	Accessibility	Scan login and inventory pages	No serious or critical accessibility violations
