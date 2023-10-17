/*1 */
insert into account(account_firstname, account_lastname, account_email, account_password)
values ('Tony', 'Stark', 'tony@starkent.com', 'Iam1ronM@n');

 

/*2 */
UPDATE account
SET account_type = 'Admin'
WHERE account_firstname = 'Tony' AND account_lastname = 'Stark';


/*3 Using Id to ensure right record is deleted*/
DELETE FROM account WHERE account_id =1;


/*4 */
UPDATE
   inventory
SET
   inv_description = regexp_replace(inv_description,'the small interiors' ,'a huge interior')
WHERE
   inv_make = 'GM' AND inv_model = 'Hummer';


/*5 */
SELECT inv.inv_make, inv.inv_model, cla.classification_name
FROM public.inventory AS inv
INNER JOIN public.classification AS cla
ON inv.classification_id = cla.classification_id
WHERE cla.classification_name = 'Sport';

 

/*6 */
UPDATE public.inventory
SET inv_image = CONCAT(SUBSTRING(inv_image, 1, POSITION('/' IN inv_image)), '/vehicles', SUBSTRING(inv_image, POSITION('/' IN inv_image) + 1)),
    inv_thumbnail = CONCAT(SUBSTRING(inv_thumbnail, 1, POSITION('/' IN inv_thumbnail)), '/vehicles', SUBSTRING(inv_thumbnail, POSITION('/' IN inv_thumbnail) + 1));