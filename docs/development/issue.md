# ErrorException - Internal Server Error

Attempt to read property "value" on null

PHP 8.4.13
Laravel 12.32.5
laravel-demo.test

## Stack Trace

0 - app/Http/Resources/ProjectResource.php:28
1 - vendor/laravel/framework/src/Illuminate/Collections/HigherOrderCollectionProxy.php:66
2 - vendor/laravel/framework/src/Illuminate/Collections/Arr.php:778
3 - vendor/laravel/framework/src/Illuminate/Collections/Collection.php:814
4 - vendor/laravel/framework/src/Illuminate/Collections/HigherOrderCollectionProxy.php:63
5 - vendor/laravel/framework/src/Illuminate/Http/Resources/Json/ResourceCollection.php:101
6 - vendor/laravel/framework/src/Illuminate/Http/Resources/Json/JsonResource.php:114
7 - vendor/laravel/framework/src/Illuminate/Http/Resources/Json/ResourceResponse.php:38
8 - vendor/laravel/framework/src/Illuminate/Http/Resources/Json/JsonResource.php:264
9 - vendor/laravel/framework/src/Illuminate/Http/Resources/Json/ResourceCollection.php:116
10 - vendor/inertiajs/inertia-laravel/src/Response.php:409
11 - vendor/inertiajs/inertia-laravel/src/Response.php:214
12 - vendor/inertiajs/inertia-laravel/src/Response.php:178
13 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:921
14 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:906
15 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:821
16 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:180
17 - vendor/laravel/framework/src/Illuminate/Auth/Middleware/Authorize.php:59
18 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
19 - vendor/laravel/framework/src/Illuminate/Auth/Middleware/EnsureEmailIsVerified.php:41
20 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
21 - vendor/laravel/framework/src/Illuminate/Http/Middleware/AddLinkHeadersForPreloadedAssets.php:32
22 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
23 - vendor/inertiajs/inertia-laravel/src/Middleware.php:96
24 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
25 - vendor/laravel/framework/src/Illuminate/Routing/Middleware/SubstituteBindings.php:50
26 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
27 - vendor/laravel/framework/src/Illuminate/Auth/Middleware/Authenticate.php:63
28 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
29 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/VerifyCsrfToken.php:87
30 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
31 - vendor/laravel/framework/src/Illuminate/View/Middleware/ShareErrorsFromSession.php:48
32 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
33 - vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:120
34 - vendor/laravel/framework/src/Illuminate/Session/Middleware/StartSession.php:63
35 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
36 - vendor/laravel/framework/src/Illuminate/Cookie/Middleware/AddQueuedCookiesToResponse.php:36
37 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
38 - vendor/laravel/framework/src/Illuminate/Cookie/Middleware/EncryptCookies.php:74
39 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
40 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
41 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:821
42 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:800
43 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:764
44 - vendor/laravel/framework/src/Illuminate/Routing/Router.php:753
45 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:200
46 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:180
47 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
48 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/ConvertEmptyStringsToNull.php:31
49 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
50 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TransformsRequest.php:21
51 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/TrimStrings.php:51
52 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
53 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePostSize.php:27
54 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
55 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/PreventRequestsDuringMaintenance.php:109
56 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
57 - vendor/laravel/framework/src/Illuminate/Http/Middleware/HandleCors.php:48
58 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
59 - vendor/laravel/framework/src/Illuminate/Http/Middleware/TrustProxies.php:58
60 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
61 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Middleware/InvokeDeferredCallbacks.php:22
62 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
63 - vendor/laravel/framework/src/Illuminate/Http/Middleware/ValidatePathEncoding.php:26
64 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:219
65 - vendor/laravel/framework/src/Illuminate/Pipeline/Pipeline.php:137
66 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:175
67 - vendor/laravel/framework/src/Illuminate/Foundation/Http/Kernel.php:144
68 - vendor/laravel/framework/src/Illuminate/Foundation/Application.php:1220
69 - public/index.php:20
70 - /Applications/Herd.app/Contents/Resources/valet/server.php:167

## Request

GET /tasks

## Headers

- **cookie**: remember_web_59ba36addc2b2f9401580f014c7f58ea4e30989d=eyJpdiI6ImNSTGVreFRYUW0wS1N3NUkrUFV6Z0E9PSIsInZhbHVlIjoiVHdDV2pyWUluNlYrNldTTGE5T09LOTBDaU52Q0FpVE4yQ2xlQWhrVmVvdmhqWjg1T2VQdjMrQWdZcW5QVXQ4bWd4dG0raEU1MEltY0NTNlRpbWdFT2c4cGZLR2F0dmEyTVVLVUtaaE1VVHZ6ODVmanhWZkttcDg4Q0lzVkpWc09uTjByNC9keVExckI5cERRL1NMTkVEZnEva3VMSjZkZWNHcnFLRFducEVhRlptS05KemNxT3ZUK2VCbnBJTzMzazY2WGhjT1U0YmZOeDE5cGNkUENBaUY0dEVQZFZITWZPZVFWaXFvY0ppRT0iLCJtYWMiOiJlNTRkNzc1MTEwY2E4ZGYwMmEyOTVlM2VkMWM4MTQyZTE2NmI3ZTY2ODI2ZTc5NzE1NTNmMjJmMDMxOTc3ZmE0IiwidGFnIjoiIn0%3D; XSRF-TOKEN=eyJpdiI6IlIyNXVCeXJ1bk10SkdmNlFSU3RBQ3c9PSIsInZhbHVlIjoiWDA0QzBvM0tlZDdqMTNXRFdXc040eE0zVWwydHg3QnhMaUVNd3lqN0hDd0h4QWNKcmR4M256TWNacElQZkg0WHlWaHVZY1dSaVlFN3pFTWhyQjRSVWJ3eEtaY0hNTWRMa09GRFdTMmJMdzk5WEV2V0h2TGREUWlKZGNaaDZUU0IiLCJtYWMiOiI4ZjJjZDk1NmQ5M2VlZWUxYzEwNDAxMDQ4YWU5NTM3YjYxN2Q1ZWRmODI1NTM2YzE5MTE1ZGU5YzhmNDUwYzBhIiwidGFnIjoiIn0%3D; laravel-session=eyJpdiI6Imw3Vm9jaCtGWWpPTVRBS0NiWmx5ZVE9PSIsInZhbHVlIjoidmIwck1TdDZNTmlmczZEazVySGZzZko0VHplRnlHbjRsNFJmU0FhRi9hQm5WZUNtVmowS2xkZkllWkxLdXBUcXprdDRIRy9tSHlWb1lBdVJwWjBCSXAzM29VNHNiUVdxUHFOMjMzWDRBRlI3Z3lXbkJ1VnJ5NHlseFdzUlhkbXEiLCJtYWMiOiI4MzAzNTFhNTU2NThjMjJhNGFjYjNiMTdlZTk0OWQwYTQ1N2YxMDdkZTFmMjY4MTFkODhmZjZkNWE5OTAzMzJiIiwidGFnIjoiIn0%3D
- **accept-language**: en-US,en;q=0.9
- **accept-encoding**: gzip, deflate
- **referer**: http://laravel-demo.test/projects
- **user-agent**: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/142.0.0.0 Safari/537.36
- **x-inertia**: true
- **accept**: text/html, application/xhtml+xml
- **x-inertia-version**: 80b4761f10307e2758ac6e9ef73b85a2
- **x-requested-with**: XMLHttpRequest
- **x-xsrf-token**: eyJpdiI6IlIyNXVCeXJ1bk10SkdmNlFSU3RBQ3c9PSIsInZhbHVlIjoiWDA0QzBvM0tlZDdqMTNXRFdXc040eE0zVWwydHg3QnhMaUVNd3lqN0hDd0h4QWNKcmR4M256TWNacElQZkg0WHlWaHVZY1dSaVlFN3pFTWhyQjRSVWJ3eEtaY0hNTWRMa09GRFdTMmJMdzk5WEV2V0h2TGREUWlKZGNaaDZUU0IiLCJtYWMiOiI4ZjJjZDk1NmQ5M2VlZWUxYzEwNDAxMDQ4YWU5NTM3YjYxN2Q1ZWRmODI1NTM2YzE5MTE1ZGU5YzhmNDUwYzBhIiwidGFnIjoiIn0=
- **connection**: keep-alive
- **host**: laravel-demo.test

## Route Context

controller: App\Http\Controllers\TaskController@index
route name: tasks.index
middleware: web, auth, verified, can:viewAny,App\Models\Task

## Route Parameters

No route parameter data available.

## Database Queries

- mysql - select \* from `sessions` where `id` = 'uZqfrXhVBeEdUVG3nRUXrvcrWL9h78zDT85bwZA5' limit 1 (1.56 ms)
- mysql - select \* from `users` where `id` = 1 limit 1 (0.33 ms)
- mysql - select count(_) as aggregate from `tasks` where exists (select _ from `projects` where `tasks`.`project_id` = `projects`.`id` and `user_id` = 1) (0.73 ms)
- mysql - select _ from `tasks` where exists (select _ from `projects` where `tasks`.`project_id` = `projects`.`id` and `user_id` = 1) order by `created_at` desc limit 15 offset 0 (0.78 ms)
- mysql - select \* from `projects` where `projects`.`id` in (1, 2, 3, 4) (0.47 ms)
- mysql - select \* from `users` where `users`.`id` in (1, 3, 4, 5, 6, 7) (0.37 ms)
- mysql - select `id`, `name` from `projects` where `user_id` = 1 (0.38 ms)
