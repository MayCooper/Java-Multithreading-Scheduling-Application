# Java-Multithreading-Scheduling-Application
A multithreaded hotel scheduling application built with a Java Spring back end and an Angular front end. Features include multilingual support, currency display, and time zone conversion. The application is containerized with Docker and prepared for cloud deployment.

Examples of Multi-Threading functionality
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/36f50073-d101-4d2c-8e5f-7bd0c86555ed)

Real-time Time Conversion functionality
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/3b3ad14d-76f8-47c5-8d1b-98f0e9574641)

Room number Display and Currency Conversion functionality
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/1b08a523-7e66-4a5c-b8ae-f8a88090494c)

Creating Dockerfile
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/8393a9bb-9a15-41da-a911-0d557c62479f)

Docker container running
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/f0723fe6-f07c-4c51-a544-04c7b930d0e6)
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/37bf0172-420b-41c7-b77e-795626722d90)

Branch History
![image](https://github.com/MayCooper/Java-Multithreading-Scheduling-Application/assets/82129870/82fb2275-5c49-40d1-a240-8fe255d75258)

Describe how you would deploy the current multithreaded Spring application to the cloud. Include the name of the cloud service provider you would use:

In the deployment of the current multithreaded Spring application to a cloud environment, I would opt for Amazon Web Services (AWS) as the cloud service provider. AWS provides a robust, scalable, and secure infrastructure that is conducive to deploying Java applications, particularly those built with the Spring Framework, which is inherently suited for enterprise-grade deployments.
Deployment Steps:
1.	Containerization: First, containerize the application using Docker for environment consistency and scalability.
2.	Orchestration: Deploy the containerized application using Amazon Elastic Container Service (ECS), which offers integrated service orchestration.
3.	Load Balancing and Auto-Scaling: Implement an Application Load Balancer (ALB) to manage traffic and configure AWS Auto Scaling to adjust resource allocation based on demand.
4.	Database Services: Utilize Amazon RDS for relational database needs, ensuring simplified management and scalability.
5.	Monitoring: Employ AWS CloudWatch for monitoring application performance and logs to maintain operational health.
6.	Security: Configure AWS Identity and Access Management (IAM) and security groups to safeguard the application against unauthorized access.
Deploying to AWS using these steps allows leveraging a comprehensive set of scalable and managed services that can support a multithreaded Spring application effectively. The flexibility and breadth of AWS services provide a solid foundation


