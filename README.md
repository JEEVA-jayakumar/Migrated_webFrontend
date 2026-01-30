# web_frontend

\*\*Framework=> Vue/Quasar

\*\*You can execute quasar build to bundle files which will be automatically saved as files in dist/spa-mat.
So when you wish to push files to server, you must transfer files in dist/spa-mat.

<!-- \*\*Basic quasar configurations can be managed in ./quasar.conf.js -->

<!-- \*\*All variables used in templates are defined as global variables in plugins/GlobalVariables.js -->

<!-- **********important******************* -->

While moving to production/ stagging, please dont forget to follow points below.

<!-- \*\*Url needs to be changed to in two places, -->

1. Plugins/vue-resource => apiHost
2. Store/GlobalVaribales => LOCAL_BASEURL_FOR_FILES
3. Store/GlobalVaribales => Mars api host based on environment
4. Components > showMarsFormComponent > chnage mdrPlan
5. Quasar config > change publicPath

<!-- \*\*Globally in some places raw values can be seen -->

// 1 => Approve/ positive action
//2 => Reject negative action

<!-- \*\*Components/showMarsComponent -->

Search merchant.mdrPlan.code, code varies based on environment
