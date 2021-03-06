## 1.Detailed introduction

This chapter will introduce the detailed functions and core business processes of each module in detail

#### 1.1 Application management service
The application management service is used to organize and manage applications in DOP (each application can be regarded as a service). It stores all the metadata required in the application DevOps process, therefore it needs to interact with other management services, among which the most closely connected one is the pipeline management service. In addition, the application management service can make it easy to configure the deployment environment for applications. Currently only Kubernetes deployment is supported.

#####  1.1.1 Functions overview
![TIM截图20190620163702](https://user-images.githubusercontent.com/17808702/59833958-b942cf00-9379-11e9-8870-0dffc0fa27a0.png)

#### 1.2 Pipeline management service

The pipeline management service manages all continuous delivery pipelines of applications in DOP. The underlying implementation relies on the Jenkins’s pipeline. Compared with Jenkins, it is easier to use and can bridge the gap of data from different processes, including pull code, build, test, build a image, and deploy the image to Kubernetes clusters. Data generated by each process of the pipeline are stored and managed by the unified DOP. Execution results of each phase in the whole pipeline can be visually displayed in real time, e.g.

#####  1.2.1 Functions overview
![TIM截图20190620184746](https://user-images.githubusercontent.com/17808702/59843893-121b6300-938c-11e9-9ba8-aa049709a77d.png)

#### 1.3 Test management service

This service is responsible for the management of test cases. Users can define manual test and automatic interface test cases. Interface test cases can be automatically executed according to defined policies. Specific functions of this service are test case management, test case design, test case execution, and test result visualization. It also provides other features like the regression test, scanning of the static source code, test coverage, and stress test.

#####  1.3.1 Functions overview
![TIM截图20190620181702](https://user-images.githubusercontent.com/17808702/59841801-ac2cdc80-9387-11e9-889e-3dfa6115f744.png)

#### 1.4 Code management service

The code management service is for the management of code repositories, which is implemented based on the underlying support of GitLab. This service provides a subset of GitLab’s functionalities, repository list, repository detail, repository configuration, request
merging, etc.

#####  1.4.1 Functions overview
![TIM图片20190620185615](https://user-images.githubusercontent.com/17808702/59844310-23b13a80-938d-11e9-91d3-6eb2a4b3eeae.png)



#### 1.5 Container image management service

DOP provides complete container image management during the build process through container image management service and it has its own image repository. Functions provided by this service include user management, pull images, push images, namespace management, image repository management, etc. 

#####  1.5.1 Functions overview
![TIM截图20190620183244](https://user-images.githubusercontent.com/17808702/59842879-029b1a80-938a-11e9-8412-461dc34165c5.png)

#### 1.6 Authority management service

>Authority management service is a basic layer service used for authority management of various business services. Currently, it has been able to realize functional authority based on RBAC and data authority management based on rules.The business side can configure and verify permissions by calling relevant interfaces.

#####  1.6.1 Functions overview
![TIM截图20190620184414](https://user-images.githubusercontent.com/17808702/59843616-83a6e180-938b-11e9-937b-27ec2f708992.png)

