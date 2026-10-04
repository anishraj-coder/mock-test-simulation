/**
 * Sample mock tests loaded directly from sample_test_accenture/
 */

export const SAMPLE_TESTS = [
  {
    "title": "Accenture Technical Mock Test 2: Scenario-Based (Cloud, Cloud Security, Networking)",
    "description": "45 scenario-based MCQs across three sections (15 each). Read each story, identify every requirement, then choose the single best answer. Marking: +1 for each correct answer, no negative marking. Duration: 45 minutes.",
    "durationMinutes": 45,
    "markingScheme": {
      "correct": 1,
      "incorrect": 0
    },
    "sections": [
      {
        "id": "sec_1",
        "name": "Cloud Basics",
        "questions": [
          {
            "id": "q_1",
            "question": "A two-person startup is launching a web app whose traffic is completely unpredictable. They have no operations staff and want to pay only for the requests actually served. Which approach fits best?",
            "options": [
              "Buy physical servers sized for the expected peak load",
              "Reserve large virtual machines for three years",
              "Use a serverless or fully managed platform that scales automatically and bills per use",
              "Rent bare-metal servers and manage the operating system themselves"
            ],
            "correctAnswer": 2,
            "explanation": "Serverless or fully managed services remove server management, scale with demand and bill by usage. Fixed servers, long reservations and bare metal all pay for idle capacity and need operations staff."
          },
          {
            "id": "q_2",
            "question": "A company must vacate its data center in six weeks. Its legacy application cannot be rewritten in that time. Which migration strategy is most appropriate?",
            "options": [
              "Rehost (lift-and-shift) the application onto cloud virtual machines",
              "Refactor the application into microservices before moving",
              "Rebuild the application as a cloud-native app first",
              "Replace it with a SaaS product after a year-long evaluation"
            ],
            "correctAnswer": 0,
            "explanation": "Rehosting moves the application with little or no code change, the only option that fits a six-week deadline. Refactoring, rebuilding and replacing all take far longer."
          },
          {
            "id": "q_3",
            "question": "A retailer decides it can lose at most 5 minutes of order data and must be back online within 30 minutes after a disaster. Which values should go into the disaster recovery plan?",
            "options": [
              "RPO = 30 minutes, RTO = 5 minutes",
              "RPO = 35 minutes, RTO = 35 minutes",
              "RPO = 5 minutes, RTO = 5 minutes",
              "RPO = 5 minutes, RTO = 30 minutes"
            ],
            "correctAnswer": 3,
            "explanation": "RPO (Recovery Point Objective) is the maximum acceptable data loss measured in time: 5 minutes. RTO (Recovery Time Objective) is the maximum acceptable downtime: 30 minutes."
          },
          {
            "id": "q_4",
            "question": "A company runs a database 24x7 for the next three years and also runs a nightly image-processing batch job that can safely be interrupted and restarted. Which pricing mix is the most cost-effective?",
            "options": [
              "On-demand pricing for both workloads",
              "Reserved or committed pricing for the database and spot/preemptible instances for the batch job",
              "Spot instances for the database and reserved instances for the batch job",
              "Dedicated hosts for both workloads"
            ],
            "correctAnswer": 1,
            "explanation": "Steady, predictable workloads get the best discount from reserved or committed pricing. Interruptible batch jobs suit cheap spot capacity. Putting a database on spot risks sudden termination."
          },
          {
            "id": "q_5",
            "question": "A company wants to avoid being tied to a single cloud provider and to move workloads between providers with minimal change. Which approach helps most?",
            "options": [
              "Use each provider's proprietary managed services exclusively",
              "Build everything on one provider's serverless functions",
              "Package applications as containers, orchestrate them with Kubernetes and prefer open standards",
              "Keep all workloads inside a single large VM image"
            ],
            "correctAnswer": 2,
            "explanation": "Containers plus Kubernetes and open standards are portable across providers. Proprietary services and provider-specific functions increase vendor lock-in."
          },
          {
            "id": "q_6",
            "question": "A hospital in India is moving a patient portal to the cloud. Regulations require patient data to stay inside the country, and all users are in India. What should the architect choose?",
            "options": [
              "A cloud region located in India, with replication restricted to that country",
              "The cheapest region available worldwide",
              "A multi-region setup replicating data to the US and Europe for resilience",
              "A CDN that caches patient records at edge locations worldwide"
            ],
            "correctAnswer": 0,
            "explanation": "Data residency rules mean choosing an in-country region and keeping replicas and backups within it. Global regions, cross-border replication or worldwide caching would move regulated data abroad."
          },
          {
            "id": "q_7",
            "question": "An application's logs are read daily for 30 days, rarely afterwards, and must be retained for 7 years at the lowest possible cost. What is the best solution?",
            "options": [
              "Keep all logs in the hot storage tier for 7 years",
              "Delete the logs after 30 days",
              "Copy the logs manually to another bucket every month",
              "Use an object storage lifecycle policy that moves logs to cold or archive storage after 30 days"
            ],
            "correctAnswer": 3,
            "explanation": "A lifecycle policy automates tiering: hot storage for frequent access, then cheaper archive storage for long retention. Hot storage is costly and deletion violates the 7-year requirement."
          },
          {
            "id": "q_8",
            "question": "An online store needs strictly consistent transactions for orders and payments, plus a flexible schema that scales massively for a product catalogue with varying attributes. Which pairing is most suitable?",
            "options": [
              "NoSQL for orders and a relational database for the catalogue",
              "A relational database for orders and a NoSQL database for the catalogue",
              "A spreadsheet for both",
              "Object storage for both"
            ],
            "correctAnswer": 1,
            "explanation": "Relational databases provide ACID transactions for orders and payments. NoSQL databases handle flexible schemas and massive scale well, which suits product catalogues."
          },
          {
            "id": "q_9",
            "question": "During sales, the order service crashes whenever the payment service responds slowly, because it waits synchronously for every response. How can the architect make the system more resilient?",
            "options": [
              "Introduce a message queue between the services so orders are processed asynchronously",
              "Increase the timeout to several hours",
              "Merge both services onto a single server",
              "Turn off the payment service during sales"
            ],
            "correctAnswer": 0,
            "explanation": "A queue decouples the services: orders are buffered and processed at the payment service's pace, so a slowdown no longer crashes the order service."
          },
          {
            "id": "q_10",
            "question": "A SaaS vendor hosts hundreds of customers on shared infrastructure, yet each customer can see only its own data. Which cloud concepts describe this?",
            "options": [
              "Single tenancy and cloud bursting",
              "Elasticity and replication",
              "Multi-tenancy with logical isolation, enabled by resource pooling",
              "Hybrid cloud and colocation"
            ],
            "correctAnswer": 2,
            "explanation": "Resource pooling lets a provider serve many customers (tenants) on shared hardware, and logical isolation keeps each tenant's data separate."
          },
          {
            "id": "q_11",
            "question": "A team wants the platform to add servers automatically when average CPU stays above 80% for five minutes, and remove them when it drops. Which components are required?",
            "options": [
              "Only a larger instance size",
              "Regular backups and snapshots",
              "A DNS record and a TLS certificate",
              "Monitoring metrics with an alarm that triggers an auto-scaling policy"
            ],
            "correctAnswer": 3,
            "explanation": "Monitoring supplies the CPU metric, the alarm detects the threshold breach, and the auto-scaling policy adds or removes instances automatically."
          },
          {
            "id": "q_12",
            "question": "Staging and production environments keep drifting apart because engineers change settings manually in the console. The team wants repeatable, reviewable environment creation. What should they adopt?",
            "options": [
              "More detailed wiki documentation",
              "Infrastructure as Code (e.g., Terraform, CloudFormation, Bicep) stored in version control",
              "Larger instance sizes",
              "A shared administrator account for faster changes"
            ],
            "correctAnswer": 1,
            "explanation": "Infrastructure as Code defines environments in versioned files, making them repeatable, reviewable and consistent across stages."
          },
          {
            "id": "q_13",
            "question": "A load balancer fronts three identical web servers. One server crashes and about one-third of users now see errors. What was missing from the setup?",
            "options": [
              "Health checks that remove unhealthy servers from rotation",
              "A larger database",
              "A longer DNS TTL",
              "Switching the application protocol to UDP"
            ],
            "correctAnswer": 0,
            "explanation": "Health checks let the load balancer detect a failed server and stop sending traffic to it, so users are only routed to healthy instances."
          },
          {
            "id": "q_14",
            "question": "An application depends on two services in series, each with a 99.9% availability SLA. What is the approximate availability of the whole application?",
            "options": [
              "99.9%",
              "100%",
              "About 99.8%",
              "99.99%"
            ],
            "correctAnswer": 2,
            "explanation": "Serial dependencies multiply: 0.999 x 0.999 = 0.998, about 99.8%. Composite availability is always lower than any single component's."
          },
          {
            "id": "q_15",
            "question": "A company must move 500 TB of archives to the cloud, but its internet link would take months. What is the most practical option?",
            "options": [
              "Write more upload scripts and run them in parallel on the same link",
              "Use an offline physical transfer appliance shipped by the cloud provider",
              "Email the files in compressed batches",
              "Ask employees to upload pieces from home connections"
            ],
            "correctAnswer": 1,
            "explanation": "Offline transfer appliances (e.g., AWS Snowball, Azure Data Box) move very large datasets physically, bypassing limited network bandwidth."
          }
        ]
      },
      {
        "id": "sec_2",
        "name": "Cloud Security",
        "questions": [
          {
            "id": "q_16",
            "question": "A contractor with access to many cloud resources leaves the company. The company uses a central identity provider with single sign-on for all cloud accounts. What is the most effective way to cut off access?",
            "options": [
              "Ask the contractor to delete saved passwords",
              "Change only the cloud account's root password",
              "Wait for the contractor's passwords to expire",
              "Disable the identity in the central identity provider and revoke active sessions and tokens"
            ],
            "correctAnswer": 3,
            "explanation": "With centralized identity, disabling the user once and revoking live sessions removes access everywhere. The other options leave valid credentials or sessions in place."
          },
          {
            "id": "q_17",
            "question": "Backup drives are shipped to an off-site vault and a courier loses one box. Which control would have made the data unusable to whoever finds it?",
            "options": [
              "Compressing the backups with ZIP",
              "Encrypting the backups with AES-256, with keys stored separately in a KMS or HSM",
              "Labeling boxes with serial numbers",
              "Hashing the backups with MD5"
            ],
            "correctAnswer": 1,
            "explanation": "Encryption at rest with separately held keys protects lost media. Compression and labels do not protect data, and a hash is one-way so the backup could not be restored."
          },
          {
            "id": "q_18",
            "question": "After a breach, forensic analysts must later prove that a collected log file has not been modified. What is the best method?",
            "options": [
              "Compute a SHA-256 hash at collection time and record it in a separate tamper-evident store",
              "Rename the file with a timestamp",
              "Base64-encode the file",
              "Encrypt the file with a key kept in the same folder"
            ],
            "correctAnswer": 0,
            "explanation": "A cryptographic hash recorded separately lets anyone recompute and compare it to detect any change. Renaming and Base64 give no integrity, and a key stored beside the file offers no real protection."
          },
          {
            "id": "q_19",
            "question": "Ransomware encrypted a company's production data. The attacker, using stolen admin credentials, also deleted the backups. Which control would have protected the backups best?",
            "options": [
              "Storing backups on the same server as production data",
              "Compressing the backups",
              "Immutable (WORM or object-lock) backups kept in a separate account with different credentials",
              "Renaming the backup files"
            ],
            "correctAnswer": 2,
            "explanation": "Immutable backups cannot be altered or deleted during the retention period, and a separate account prevents stolen admin credentials from reaching them."
          },
          {
            "id": "q_20",
            "question": "A user normally signs in from Pune, but a login with the correct password succeeds from another continent at 3 a.m. The company wants such attempts challenged automatically. Which feature provides this?",
            "options": [
              "Requiring longer passwords",
              "Risk-based (conditional access) authentication that triggers step-up MFA",
              "Adding a password hint",
              "Extending session timeouts"
            ],
            "correctAnswer": 1,
            "explanation": "Risk-based or conditional access evaluates context such as location and time, then demands an extra factor for suspicious logins."
          },
          {
            "id": "q_21",
            "question": "Employees juggle many passwords across cloud apps, and IT wants centralized control and quick revocation. What is the best solution?",
            "options": [
              "A shared team password",
              "A spreadsheet of passwords",
              "Letting each application manage its own passwords",
              "Single sign-on using federation (SAML or OIDC) with a central identity provider"
            ],
            "correctAnswer": 3,
            "explanation": "SSO with federation gives one login, central policy such as MFA, and one place to revoke access."
          },
          {
            "id": "q_22",
            "question": "A code review finds a database password hard-coded in source code stored in a shared repository. What is the best remediation?",
            "options": [
              "Move secrets to a secrets manager, fetch them at runtime, and rotate the exposed password",
              "Base64-encode the password in the code",
              "Move the password into a code comment",
              "Make the repository private and leave the password as is"
            ],
            "correctAnswer": 0,
            "explanation": "Secrets belong in a managed vault accessed at runtime, and the exposed password must be rotated. Base64 is not encryption, and exposure in history remains a risk."
          },
          {
            "id": "q_23",
            "question": "A compromised web server was used to reach a database holding customer PII. Which change best limits this kind of lateral movement?",
            "options": [
              "Open the database to the whole VPC for easier debugging",
              "Place the database in the same security group as the web tier",
              "Allow database inbound traffic only from the application tier on the database port, in a private subnet",
              "Increase the web server's CPU size"
            ],
            "correctAnswer": 2,
            "explanation": "Network segmentation with least-privilege security group rules means only the application tier can reach the database, and only on the required port."
          },
          {
            "id": "q_24",
            "question": "After an incident, the team cannot determine who deleted several cloud resources. What should they enable and protect for the future?",
            "options": [
              "Disable logging to save cost",
              "Take occasional screenshots of the console",
              "Keep logs only on each individual VM",
              "Centralized audit logging of management and API activity stored in an immutable, access-restricted location"
            ],
            "correctAnswer": 3,
            "explanation": "Audit logs (e.g., CloudTrail, Azure Activity Log) record who did what and when. Storing them centrally and immutably prevents attackers from erasing the evidence."
          },
          {
            "id": "q_25",
            "question": "A customer ends its contract and demands proof that its data in shared multi-tenant storage is irrecoverable. Overwriting every replica is impractical. Which approach works?",
            "options": [
              "Rename the customer's objects",
              "Encrypt the customer's data with a dedicated key and securely destroy that key (crypto-shredding)",
              "Move the data to another bucket",
              "Hash the data with SHA-256"
            ],
            "correctAnswer": 1,
            "explanation": "If data is encrypted under a dedicated key, destroying the key makes all copies, including backups and replicas, unreadable. Renaming and moving leave data intact; hashing is not a deletion method."
          },
          {
            "id": "q_26",
            "question": "Compliance requires that traffic between internal microservices be encrypted too, not just traffic arriving from the internet. What should be implemented?",
            "options": [
              "Mutual TLS (or TLS) between the services",
              "Rely on the perimeter firewall only",
              "Base64-encode the payloads",
              "Use plain HTTP inside the VPC because it is private"
            ],
            "correctAnswer": 0,
            "explanation": "Encrypting east-west traffic with TLS or mutual TLS protects data between services and also authenticates them. A perimeter firewall does not protect internal traffic."
          },
          {
            "id": "q_27",
            "question": "A penetration test shows containers running with outdated libraries that contain known vulnerabilities. How can the team stop this from reaching production in future?",
            "options": [
              "Disable penetration testing",
              "Deploy first and patch if someone complains",
              "Scan container images in the CI/CD pipeline and block deployment when critical findings appear",
              "Restart the containers every day"
            ],
            "correctAnswer": 2,
            "explanation": "Shifting security left with automated image scanning in CI/CD catches vulnerable dependencies before deployment. Restarting does not update libraries."
          },
          {
            "id": "q_28",
            "question": "Customers see a browser warning that the payment portal's certificate has expired. What are the best immediate and long-term actions?",
            "options": [
              "Tell customers to ignore the warning",
              "Renew the certificate from a trusted CA and automate renewal and expiry monitoring",
              "Switch the portal to plain HTTP",
              "Replace it with a self-signed certificate"
            ],
            "correctAnswer": 1,
            "explanation": "Renewing from a trusted CA fixes the problem, and automated renewal with monitoring prevents recurrence. HTTP or self-signed certificates reduce trust and security."
          },
          {
            "id": "q_29",
            "question": "Developers need production-like data in testing, but real customer names and card numbers must not be exposed. What should be done?",
            "options": [
              "Copy the production database as is",
              "Email a sample of production data to developers",
              "Remove only the passwords",
              "Mask or tokenize sensitive fields before the data reaches test environments"
            ],
            "correctAnswer": 3,
            "explanation": "Data masking or tokenization keeps realistic structure while hiding sensitive values, so testers never see real PII or card data."
          },
          {
            "id": "q_30",
            "question": "A company finds that its managed (PaaS) database is reachable from the entire internet because of a permissive firewall rule it configured. Who is responsible?",
            "options": [
              "The customer, because access configuration remains theirs even on managed services",
              "The provider, because the database is managed",
              "The internet service provider",
              "No one, since it is the default behaviour"
            ],
            "correctAnswer": 0,
            "explanation": "Under shared responsibility, the provider secures the platform, but customers configure access, network rules and data protection for their own resources."
          }
        ]
      },
      {
        "id": "sec_3",
        "name": "Networking",
        "questions": [
          {
            "id": "q_31",
            "question": "A technician tests a PC: ping 127.0.0.1 succeeds, ping the PC's own IP succeeds, ping the default gateway succeeds, but ping 8.8.8.8 fails. Where is the problem most likely?",
            "options": [
              "The PC's network card",
              "Beyond the local network, such as the router's WAN/ISP link or routing",
              "The PC's TCP/IP stack",
              "The cable between the PC and the switch"
            ],
            "correctAnswer": 1,
            "explanation": "The loopback, local interface and gateway pings succeed, so the PC, its stack and the local link are fine. The failure lies past the gateway: the ISP link, routing or upstream path."
          },
          {
            "id": "q_32",
            "question": "A company wants to split 192.168.10.0/24 into 6 equal subnets. Which subnet mask should be used?",
            "options": [
              "255.255.255.192",
              "255.255.255.240",
              "255.255.255.128",
              "255.255.255.224"
            ],
            "correctAnswer": 3,
            "explanation": "Six subnets need 3 borrowed bits (2^3 = 8 subnets), giving /27 = 255.255.255.224. A /26 gives only 4 subnets; a /28 gives 16 (more than needed)."
          },
          {
            "id": "q_33",
            "question": "A department needs addresses for 50 devices in one subnet. What is the smallest CIDR block that works?",
            "options": [
              "/26",
              "/27",
              "/28",
              "/25"
            ],
            "correctAnswer": 0,
            "explanation": "A /26 has 64 addresses (62 usable), enough for 50 devices. A /27 has 30 usable and a /28 has 14, both too small. A /25 works but wastes addresses."
          },
          {
            "id": "q_34",
            "question": "An architect needs requests for /images routed to one server group and /api to another, behind a single URL. Which load balancer type is required?",
            "options": [
              "A Layer 4 (transport) load balancer",
              "DNS round robin",
              "A Layer 7 (application) load balancer with path-based routing",
              "A network hub"
            ],
            "correctAnswer": 2,
            "explanation": "Routing on the URL path requires inspecting HTTP content, which a Layer 7 load balancer does. Layer 4 balancers see only IPs and ports."
          },
          {
            "id": "q_35",
            "question": "An admin wants www.shop.com to alias another hostname managed by a CDN, and wants email for shop.com delivered to specific mail servers. Which DNS records are needed?",
            "options": [
              "A record and PTR record",
              "NS and SOA records",
              "MX record for the alias and CNAME record for mail",
              "CNAME record for www and MX record for mail"
            ],
            "correctAnswer": 3,
            "explanation": "A CNAME creates an alias from one hostname to another, and MX records tell senders which mail servers accept email for the domain."
          },
          {
            "id": "q_36",
            "question": "A user logs in successfully but receives an HTTP error when opening the admin page because the account lacks permission. Which status code is most likely?",
            "options": [
              "401 Unauthorized",
              "403 Forbidden",
              "404 Not Found",
              "500 Internal Server Error"
            ],
            "correctAnswer": 1,
            "explanation": "403 means the user is identified but not allowed to access the resource. 401 means authentication is missing or failed; 404 means not found; 500 is a server error."
          },
          {
            "id": "q_37",
            "question": "A branch office must be permanently connected to head office so that all branch devices reach HQ resources transparently over the internet. What should be set up?",
            "options": [
              "An individual client VPN on each PC",
              "Telnet sessions to the HQ servers",
              "A site-to-site IPsec VPN between the two gateways",
              "Public Wi-Fi at the branch"
            ],
            "correctAnswer": 2,
            "explanation": "A site-to-site VPN links two networks through encrypted tunnels between gateways, so users need no client software. Telnet is unencrypted."
          },
          {
            "id": "q_38",
            "question": "A new web server runs HTTPS on port 443, but browsers cannot reach it. Its security group allows inbound traffic only on ports 80 and 22. What fix is needed?",
            "options": [
              "Add an inbound rule allowing TCP port 443",
              "Open all ports to everyone",
              "Restart the DNS service",
              "Add an outbound rule only for port 80"
            ],
            "correctAnswer": 0,
            "explanation": "Security groups deny inbound traffic by default, so the HTTPS port must be explicitly allowed. Opening all ports violates least privilege."
          },
          {
            "id": "q_39",
            "question": "In a cloud network, a stateless network ACL allows inbound TCP 443, but clients still never receive responses. What is missing?",
            "options": [
              "A DHCP lease",
              "An outbound rule allowing the return traffic (ephemeral ports)",
              "A NAT gateway",
              "A larger instance size"
            ],
            "correctAnswer": 1,
            "explanation": "Stateless filters do not track connections, so return traffic needs its own explicit rule. Stateful security groups allow responses automatically."
          },
          {
            "id": "q_40",
            "question": "Users report slowness to a remote server. The admin wants to see each hop along the path and where delays occur. Which tool should be used?",
            "options": [
              "nslookup",
              "ipconfig",
              "netstat",
              "traceroute (tracert)"
            ],
            "correctAnswer": 3,
            "explanation": "traceroute lists each router hop and its response time, which helps locate where delay or loss starts. nslookup queries DNS, ipconfig shows local settings, netstat shows connections."
          },
          {
            "id": "q_41",
            "question": "Host A (192.168.1.10) wants to send a frame to Host B (192.168.1.20) on the same LAN but knows only B's IP address. Which protocol finds B's MAC address?",
            "options": [
              "DNS",
              "DHCP",
              "ARP",
              "ICMP"
            ],
            "correctAnswer": 2,
            "explanation": "ARP maps a known IPv4 address to a MAC address on the local network so the frame can be delivered."
          },
          {
            "id": "q_42",
            "question": "A fast-growing company has exhausted its public IPv4 addresses, and layered NAT is becoming complex. What is the long-term solution?",
            "options": [
              "Adopt IPv6, which uses 128-bit addresses",
              "Use a shorter subnet mask on every network",
              "Add more layers of NAT",
              "Switch every host to a static IPv4 address"
            ],
            "correctAnswer": 0,
            "explanation": "IPv6 provides a vastly larger address space (128 bits), removing the need for NAT workarounds. The other options do not create more public addresses."
          },
          {
            "id": "q_43",
            "question": "A company wants its public web server reachable from the internet, but even if it is compromised, the internal LAN must remain protected. Which design is best?",
            "options": [
              "Place the web server inside the internal LAN",
              "Connect the web server directly to the internet with no firewall",
              "Put the web server on the same VLAN as HR systems",
              "Place the web server in a DMZ separated by firewalls from both the internet and the internal LAN"
            ],
            "correctAnswer": 3,
            "explanation": "A DMZ isolates public-facing servers so a compromise cannot directly reach internal systems."
          },
          {
            "id": "q_44",
            "question": "An employee reads email on a phone, a laptop and a tablet and wants all devices to show the same folders and read status, with messages kept on the server. Which retrieval protocol fits?",
            "options": [
              "POP3",
              "IMAP",
              "SMTP",
              "FTP"
            ],
            "correctAnswer": 1,
            "explanation": "IMAP keeps mail on the server and synchronizes state across devices. POP3 typically downloads and removes mail; SMTP is used to send mail."
          },
          {
            "id": "q_45",
            "question": "A video call has noticeable delay and choppy audio even though the internet plan is 1 Gbps. Which metrics should be investigated first?",
            "options": [
              "Maximum bandwidth only",
              "Disk space on the computer",
              "Latency and jitter (and packet loss)",
              "Screen resolution"
            ],
            "correctAnswer": 2,
            "explanation": "Bandwidth is capacity, but real-time calls depend on low latency, low jitter and little packet loss. A fast plan can still have poor call quality."
          }
        ]
      }
    ],
    "id": "accenture-test-1"
  },
  {
    "title": "Accenture Technical Mock Test 3: Full Technical Assessment",
    "description": "45 technical MCQs in the proportion reported for the Accenture ASE technical round: pseudocode and output tracing, MS Office, computer networks, cloud, cybersecurity, and DBMS/OS/software basics. Marking: +1 for each correct answer, no negative marking. Duration: 45 minutes.",
    "durationMinutes": 45,
    "markingScheme": {
      "correct": 1,
      "incorrect": 0
    },
    "sections": [
      {
        "id": "sec_1",
        "name": "Pseudocode & Output Tracing",
        "questions": [
          {
            "id": "q_1",
            "question": "Read the pseudocode:\n\nSet a = 7\nSet b = 3\na = a + b\nb = a - b\na = a - b\nPrint a, b\n\nWhat is printed?",
            "options": [
              "7 3",
              "3 7",
              "10 7",
              "10 3"
            ],
            "correctAnswer": 1,
            "explanation": "a = 10; b = 10 - 3 = 7; a = 10 - 7 = 3. The values are swapped without a temporary variable, so it prints 3 7."
          },
          {
            "id": "q_2",
            "question": "A cashier's program adds only even bill numbers:\n\nSet sum = 0\nFor i = 1 to 5\n    If i mod 2 == 0\n        sum = sum + i\n    End If\nEnd For\nPrint sum\n\nWhat is the output?",
            "options": [
              "15",
              "9",
              "12",
              "6"
            ],
            "correctAnswer": 3,
            "explanation": "Only i = 2 and i = 4 satisfy i mod 2 == 0, so sum = 2 + 4 = 6."
          },
          {
            "id": "q_3",
            "question": "A program counts the digits of a number (integer division):\n\nSet n = 1234\nSet count = 0\nWhile n > 0\n    n = n / 10\n    count = count + 1\nEnd While\nPrint count\n\nWhat is printed?",
            "options": [
              "3",
              "5",
              "4",
              "1234"
            ],
            "correctAnswer": 2,
            "explanation": "n becomes 123, 12, 1, 0 across four iterations, so count = 4."
          },
          {
            "id": "q_4",
            "question": "A store applies discounts by price:\n\nSet price = 1200\nIf price > 2000\n    discount = 20\nElse If price > 1000\n    discount = 10\nElse\n    discount = 5\nEnd If\nPrint price - price * discount / 100\n\nWhat is the output?",
            "options": [
              "960",
              "1140",
              "1200",
              "1080"
            ],
            "correctAnswer": 3,
            "explanation": "1200 > 2000 is false, 1200 > 1000 is true, so discount = 10. 1200 - 1200 x 10 / 100 = 1200 - 120 = 1080."
          },
          {
            "id": "q_5",
            "question": "Study the nested loops:\n\nSet count = 0\nFor i = 1 to 3\n    For j = 1 to i\n        count = count + 1\n    End For\nEnd For\nPrint count\n\nWhat is the output?",
            "options": [
              "3",
              "9",
              "6",
              "5"
            ],
            "correctAnswer": 2,
            "explanation": "The inner loop runs 1, 2 and 3 times for i = 1, 2, 3. Total = 1 + 2 + 3 = 6."
          },
          {
            "id": "q_6",
            "question": "Consider the recursive function:\n\nFunction g(n)\n    If n == 0 Return 0\n    If n == 1 Return 1\n    Return g(n - 1) + g(n - 2)\nEnd Function\nPrint g(6)\n\nWhat is printed?",
            "options": [
              "5",
              "13",
              "21",
              "8"
            ],
            "correctAnswer": 3,
            "explanation": "This is the Fibonacci sequence: g(0)=0, g(1)=1, g(2)=1, g(3)=2, g(4)=3, g(5)=5, g(6)=8."
          },
          {
            "id": "q_7",
            "question": "Assume integer division:\n\nSet x = 10\nSet y = 3\nSet z = (x / y) * y + (x mod y)\nPrint z\n\nWhat is printed?",
            "options": [
              "9",
              "3",
              "13",
              "10"
            ],
            "correctAnswer": 3,
            "explanation": "x / y = 3 (integer division), 3 x 3 = 9, x mod y = 1, so z = 9 + 1 = 10. This is the division identity: quotient x divisor + remainder = dividend."
          },
          {
            "id": "q_8",
            "question": "A teacher's program checks marks:\n\nSet marks = [40, 60, 80, 100]\nSet total = 0\nFor each m in marks\n    total = total + m\nEnd For\nSet avg = total / 4\nSet count = 0\nFor each m in marks\n    If m > avg\n        count = count + 1\n    End If\nEnd For\nPrint count\n\nWhat is the output?",
            "options": [
              "2",
              "1",
              "3",
              "4"
            ],
            "correctAnswer": 0,
            "explanation": "total = 280, avg = 70. Marks strictly greater than 70 are 80 and 100, so count = 2."
          },
          {
            "id": "q_9",
            "question": "Trace this loop:\n\nFor i = 1 to 10\n    If i mod 3 == 0\n        Continue\n    End If\n    If i > 7\n        Break\n    End If\n    Print i\nEnd For\n\nWhat is printed?",
            "options": [
              "1 2 4 5 7",
              "1 2 3 4 5 6 7",
              "1 2 4 5 7 8",
              "1 2 4 5 7 8 10"
            ],
            "correctAnswer": 0,
            "explanation": "Multiples of 3 (3, 6, 9) are skipped by Continue. At i = 8 the condition i > 7 is true, so Break ends the loop before printing 8."
          },
          {
            "id": "q_10",
            "question": "Assume Java-style evaluation (left to right):\n\nSet i = 5\nSet j = i++ + ++i\nPrint i, j\n\nWhat is printed?",
            "options": [
              "6 11",
              "7 11",
              "7 12",
              "6 12"
            ],
            "correctAnswer": 2,
            "explanation": "i++ uses 5 and then makes i = 6. ++i makes i = 7 and uses 7. So j = 5 + 7 = 12 and i = 7."
          },
          {
            "id": "q_11",
            "question": "Evaluate the condition:\n\nSet a = 5\nSet b = 10\nIf (a > 3 AND b < 8) OR (a == 5 AND NOT (b == 10))\n    Print 'X'\nElse\n    Print 'Y'\nEnd If\n\nWhat is printed?",
            "options": [
              "X",
              "Y",
              "XY",
              "Error"
            ],
            "correctAnswer": 1,
            "explanation": "(a > 3 AND b < 8) = true AND false = false. (a == 5 AND NOT(b == 10)) = true AND false = false. false OR false = false, so the Else branch prints Y."
          },
          {
            "id": "q_12",
            "question": "A parking lot charges Rs 20 for the first 2 hours and Rs 10 for each extra hour:\n\nFunction charge(hours)\n    If hours <= 2\n        Return 20\n    Else\n        Return 20 + (hours - 2) * 10\n    End If\nEnd Function\nPrint charge(5) + charge(1)\n\nWhat is printed?",
            "options": [
              "60",
              "80",
              "90",
              "70"
            ],
            "correctAnswer": 3,
            "explanation": "charge(5) = 20 + 3 x 10 = 50. charge(1) = 20. Total = 70."
          },
          {
            "id": "q_13",
            "question": "One pass of a sorting routine:\n\nSet arr = [5, 1, 4, 2]\nFor i = 0 to 2\n    If arr[i] > arr[i + 1]\n        Swap arr[i], arr[i + 1]\n    End If\nEnd For\nPrint arr\n\nWhat is printed?",
            "options": [
              "1 2 4 5",
              "1 5 4 2",
              "1 4 2 5",
              "5 1 4 2"
            ],
            "correctAnswer": 2,
            "explanation": "i = 0: [1,5,4,2]. i = 1: [1,4,5,2]. i = 2: [1,4,2,5]. One bubble-sort pass moves the largest value to the end but does not fully sort."
          },
          {
            "id": "q_14",
            "question": "A program checks if a word is a palindrome (comparison is case-sensitive):\n\nSet s = 'Madam'\nSet rev = ''\nFor i = length(s) - 1 down to 0\n    rev = rev + s[i]\nEnd For\nIf s == rev\n    Print 'Yes'\nElse\n    Print 'No'\nEnd If\n\nWhat is printed?",
            "options": [
              "No",
              "Yes",
              "Error",
              "Nothing is printed"
            ],
            "correctAnswer": 0,
            "explanation": "The reverse of 'Madam' is 'madaM'. Because the comparison is case-sensitive, 'Madam' is not equal to 'madaM', so No is printed."
          }
        ]
      },
      {
        "id": "sec_2",
        "name": "Common Applications (MS Office)",
        "questions": [
          {
            "id": "q_15",
            "question": "A sales sheet has regions in A2:A100 and sales amounts in B2:B100. The manager wants the total sales for 'North' only. Which formula should be used?",
            "options": [
              "=SUMIF(A2:A100,\"North\",B2:B100)",
              "=SUM(B2:B100)",
              "=COUNTIF(A2:A100,\"North\")",
              "=IF(A2:A100=\"North\",B2:B100)"
            ],
            "correctAnswer": 0,
            "explanation": "SUMIF adds the values in B where the matching cell in A equals North. SUM adds everything, COUNTIF counts rows, and IF with a range does not total conditionally."
          },
          {
            "id": "q_16",
            "question": "Employee IDs are in column A (A2:A50), names in B and salaries in C. The ID to look up is in E2. Which formula returns the exact salary?",
            "options": [
              "=VLOOKUP(E2,A2:C50,3,FALSE)",
              "=VLOOKUP(E2,A2:C50,2,FALSE)",
              "=VLOOKUP(E2,A2:C50,3,TRUE)",
              "=HLOOKUP(E2,A2:C50,3,FALSE)"
            ],
            "correctAnswer": 0,
            "explanation": "Salary is the 3rd column of the table and FALSE forces an exact match. Column 2 would return the name, TRUE gives an approximate match that needs sorted data, and HLOOKUP searches across rows."
          },
          {
            "id": "q_17",
            "question": "A tax rate is stored in F1. The formula =B2*F1 in C2 is copied down the column, but from row 3 the results are wrong. What is the fix?",
            "options": [
              "Change the formula to =B2*F1 and sort the data",
              "Change the formula to =$B$2*F1",
              "Change the formula to =B2*$F1",
              "Change the formula to =B2*$F$1"
            ],
            "correctAnswer": 3,
            "explanation": "$F$1 is an absolute reference, so it stays fixed when copied. Without it, F1 shifts to F2, F3, and so on. $B$2 would freeze the wrong cell, and $F1 still lets the row change."
          },
          {
            "id": "q_18",
            "question": "HR must send 500 personalized offer letters, with each candidate's name and address taken from an Excel file. Which Word feature should be used?",
            "options": [
              "Mail Merge from the Mailings tab, using the Excel file as the data source",
              "Track Changes",
              "Format Painter",
              "Insert a Table of Contents"
            ],
            "correctAnswer": 0,
            "explanation": "Mail Merge combines one letter template with a data source to produce personalized documents. The other features do not pull data from a list."
          },
          {
            "id": "q_19",
            "question": "A 60-page report needs a table of contents that updates automatically when pages change. What is the correct approach in Word?",
            "options": [
              "Apply Heading styles to the titles and insert an automatic Table of Contents from the References tab",
              "Type the headings and page numbers manually",
              "Insert a footnote for every heading",
              "Use Find and Replace to list all headings"
            ],
            "correctAnswer": 0,
            "explanation": "An automatic Table of Contents is built from Heading styles and can be refreshed with Update Table. Manual typing and footnotes do not update by themselves."
          },
          {
            "id": "q_20",
            "question": "A company wants a PowerPoint to loop automatically at an exhibition booth, with nobody controlling it and visitors unable to change slides. Which setting should be used?",
            "options": [
              "Set up the show as 'Presented by a speaker'",
              "Set up the show as 'Browsed by an individual (window)'",
              "Set up the show as 'Browsed at a kiosk (full screen)'",
              "Print the slides as handouts"
            ],
            "correctAnswer": 2,
            "explanation": "Kiosk mode runs the show in a loop without manual control, and the viewer cannot navigate. The speaker mode needs someone to advance slides."
          },
          {
            "id": "q_21",
            "question": "A teacher wants every mark below 40 in an Excel sheet to turn red automatically, even when marks are edited later. What should be used?",
            "options": [
              "Format Painter",
              "Data Validation",
              "Freeze Panes",
              "Conditional Formatting with a 'Less Than 40' rule"
            ],
            "correctAnswer": 3,
            "explanation": "Conditional Formatting applies formatting based on cell values and updates when values change. Format Painter copies fixed formatting, and Data Validation restricts input."
          }
        ]
      },
      {
        "id": "sec_3",
        "name": "Computer Networks",
        "questions": [
          {
            "id": "q_22",
            "question": "A network administrator is working in the subnet 192.168.10.64/26. Which address CANNOT be assigned to a host?",
            "options": [
              "192.168.10.65",
              "192.168.10.100",
              "192.168.10.126",
              "192.168.10.127"
            ],
            "correctAnswer": 3,
            "explanation": "A /26 has a block size of 64, so this subnet spans .64 to .127. .64 is the network address and .127 is the broadcast address, so .127 cannot be assigned to a host."
          },
          {
            "id": "q_23",
            "question": "A school lab needs a subnet for 25 computers and wants no more addresses than necessary. Which prefix should be used?",
            "options": [
              "/28",
              "/26",
              "/27",
              "/25"
            ],
            "correctAnswer": 2,
            "explanation": "25 hosts + 2 (network and broadcast) = 27, so the next power of two is 32 = 2^5. Five host bits give /27 with 30 usable hosts. /28 provides only 14."
          },
          {
            "id": "q_24",
            "question": "A user can read emails on a phone but cannot send any. Which protocol is most likely failing?",
            "options": [
              "IMAP",
              "SMTP",
              "POP3",
              "DNS"
            ],
            "correctAnswer": 1,
            "explanation": "SMTP is used to send mail. IMAP and POP3 only retrieve mail, and they are working since the user can read messages."
          },
          {
            "id": "q_25",
            "question": "Guests connecting to office Wi-Fi get addresses like 169.254.12.7 and cannot reach the internet. What is the most likely cause?",
            "options": [
              "The DNS server is returning wrong records",
              "The DHCP server is unreachable or not responding, so devices assigned themselves APIPA addresses",
              "The router has run out of public IPv4 addresses",
              "The guests' devices have duplicate MAC addresses"
            ],
            "correctAnswer": 1,
            "explanation": "Addresses in 169.254.0.0/16 are APIPA addresses that a device gives itself when it cannot get a lease from DHCP."
          },
          {
            "id": "q_26",
            "question": "An administrator must securely manage a remote Linux server from home over the internet. Which protocol is the right choice?",
            "options": [
              "Telnet (port 23)",
              "SSH (port 22)",
              "FTP (port 21)",
              "HTTP (port 80)"
            ],
            "correctAnswer": 1,
            "explanation": "SSH encrypts remote command-line sessions. Telnet, FTP and HTTP send data, including credentials, unencrypted."
          },
          {
            "id": "q_27",
            "question": "Two departments are on different subnets, 192.168.1.0/24 and 192.168.2.0/24, and need to communicate. Which device is required?",
            "options": [
              "A router (or Layer 3 switch)",
              "A hub",
              "A repeater",
              "A Layer 2 switch alone"
            ],
            "correctAnswer": 0,
            "explanation": "Traffic between different IP subnets must be routed, which is done at Layer 3. Hubs, repeaters and Layer 2 switches do not route between subnets."
          },
          {
            "id": "q_28",
            "question": "An online multiplayer game needs very fast updates and can tolerate the occasional lost packet. Which transport protocol suits it best?",
            "options": [
              "TCP, because it retransmits lost data without causing delay",
              "ICMP, because it measures latency",
              "FTP, because it transfers files reliably",
              "UDP, because it has low overhead and does not wait to retransmit lost packets"
            ],
            "correctAnswer": 3,
            "explanation": "UDP is connectionless and fast, ideal for real-time data. TCP's retransmissions and ordering add delay, which hurts real-time play."
          }
        ]
      },
      {
        "id": "sec_4",
        "name": "Cloud Computing",
        "questions": [
          {
            "id": "q_29",
            "question": "A company wants employees to use a hosted CRM through a web browser, with no servers, operating systems or software to maintain. Which cloud service model is this?",
            "options": [
              "IaaS",
              "PaaS",
              "SaaS",
              "Colocation"
            ],
            "correctAnswer": 2,
            "explanation": "In SaaS the provider manages everything from infrastructure to application, and users only use the software."
          },
          {
            "id": "q_30",
            "question": "A startup needs powerful servers only 2 hours a day for testing and wants to stop paying when they are switched off. Which approach supports this?",
            "options": [
              "Buying servers outright (CapEx)",
              "A three-year reserved commitment",
              "Pay-as-you-go (metered) billing with on-demand resources",
              "A dedicated physical hosting contract"
            ],
            "correctAnswer": 2,
            "explanation": "On-demand, metered cloud resources charge only for the time used. Purchases and long commitments cost money while the servers sit idle."
          },
          {
            "id": "q_31",
            "question": "Under the shared responsibility model, a company using a SaaS email service is still responsible for which of the following?",
            "options": [
              "Patching the provider's servers",
              "Its own data and user access, such as accounts, passwords and MFA",
              "Physical security of the data centers",
              "Maintaining the application code"
            ],
            "correctAnswer": 1,
            "explanation": "The provider handles infrastructure and the application. Customers stay responsible for their data and who can access it."
          },
          {
            "id": "q_32",
            "question": "A government agency wants cloud benefits but needs infrastructure dedicated to its own use only. Which deployment model fits?",
            "options": [
              "Public cloud",
              "Private cloud",
              "Community cloud",
              "Hybrid cloud"
            ],
            "correctAnswer": 1,
            "explanation": "A private cloud is dedicated to a single organization. Public clouds are shared, and community clouds are shared among several organizations. Hybrid mixes private and public."
          },
          {
            "id": "q_33",
            "question": "A cloud provider's SLA promises 99.9% availability. Roughly how much downtime per year does this allow?",
            "options": [
              "About 52 minutes",
              "About 3.65 days",
              "About 8.8 hours",
              "About 5 minutes"
            ],
            "correctAnswer": 2,
            "explanation": "0.1% of a year (8,760 hours) is about 8.76 hours. 99.99% allows about 52 minutes and 99% allows about 3.65 days."
          }
        ]
      },
      {
        "id": "sec_5",
        "name": "Cybersecurity",
        "questions": [
          {
            "id": "q_34",
            "question": "An employee receives an email that appears to be from IT, saying the mailbox is full and asking them to click a link and enter their password. What should the employee do?",
            "options": [
              "Click the link and enter the password to avoid being locked out",
              "Not click the link, and report the email to the security team as phishing",
              "Reply asking for more information",
              "Forward the email to colleagues"
            ],
            "correctAnswer": 1,
            "explanation": "This is a classic phishing attempt. Do not interact with it, and report it so the security team can warn others and block it."
          },
          {
            "id": "q_35",
            "question": "A website must let users log in but must never be able to see or recover their original passwords, even if the database leaks. What should it store?",
            "options": [
              "Salted hashes created with a slow algorithm such as bcrypt",
              "Passwords encrypted with AES using one shared key",
              "Passwords encoded in Base64",
              "Passwords in plain text in a protected table"
            ],
            "correctAnswer": 0,
            "explanation": "Hashes are one-way, and salting plus a slow algorithm resists cracking. Encryption can be reversed with the key, and Base64 is just encoding."
          },
          {
            "id": "q_36",
            "question": "An attacker intercepts a payment request and changes the amount before it reaches the bank. Which CIA triad property is violated?",
            "options": [
              "Integrity",
              "Confidentiality",
              "Availability",
              "Accountability"
            ],
            "correctAnswer": 0,
            "explanation": "Integrity means data is not altered by unauthorized parties. The data was modified in transit, which violates integrity."
          },
          {
            "id": "q_37",
            "question": "Files on several office PCs are encrypted and a note demands payment. Which measure lets the company recover best without paying?",
            "options": [
              "A stronger screen-lock password",
              "A faster internet connection",
              "Disabling antivirus to avoid conflicts",
              "Regular offline or immutable backups that are tested"
            ],
            "correctAnswer": 3,
            "explanation": "Tested offline or immutable backups allow restoring clean data after ransomware. The other options do not help recovery."
          },
          {
            "id": "q_38",
            "question": "A security team wants a device that not only detects suspicious network traffic but also blocks it automatically. What should they deploy?",
            "options": [
              "An Intrusion Detection System (IDS) alone",
              "A network hub",
              "An Intrusion Prevention System (IPS)",
              "A DHCP server"
            ],
            "correctAnswer": 2,
            "explanation": "An IPS sits inline and blocks threats. An IDS only detects and alerts."
          }
        ]
      },
      {
        "id": "sec_6",
        "name": "Databases, OS & Software Practices",
        "questions": [
          {
            "id": "q_39",
            "question": "The Employees table has columns (id, name, dept, salary). Which query lists the departments that have more than 5 employees?",
            "options": [
              "SELECT dept, COUNT(*) FROM Employees WHERE COUNT(*) > 5 GROUP BY dept;",
              "SELECT dept FROM Employees HAVING COUNT(*) > 5;",
              "SELECT dept, COUNT(*) FROM Employees GROUP BY dept HAVING COUNT(*) > 5;",
              "SELECT COUNT(dept) > 5 FROM Employees;"
            ],
            "correctAnswer": 2,
            "explanation": "Aggregate conditions are applied with HAVING after GROUP BY. WHERE cannot use aggregate functions, and the other queries are invalid or do not return departments."
          },
          {
            "id": "q_40",
            "question": "Customers(cust_id, name) and Orders(order_id, cust_id) are tables. A manager wants every customer listed, including those who never placed an order. Which join is correct?",
            "options": [
              "Customers LEFT JOIN Orders ON Customers.cust_id = Orders.cust_id",
              "Customers INNER JOIN Orders ON Customers.cust_id = Orders.cust_id",
              "Customers CROSS JOIN Orders",
              "Orders LEFT JOIN Customers ON Customers.cust_id = Orders.cust_id"
            ],
            "correctAnswer": 0,
            "explanation": "LEFT JOIN keeps all rows from the left table (Customers) with NULLs where no order exists. INNER JOIN drops customers without orders, and the reversed LEFT JOIN keeps all orders instead."
          },
          {
            "id": "q_41",
            "question": "A table Enrollment(roll_no, course_id, student_name, grade) has the primary key (roll_no, course_id), but student_name depends only on roll_no. Which normal form is violated and what is the fix?",
            "options": [
              "1NF is violated; split grade into two columns",
              "3NF is violated; delete student_name",
              "No normal form is violated, so no change is needed",
              "2NF is violated; move student_name into a separate Student table keyed by roll_no"
            ],
            "correctAnswer": 3,
            "explanation": "A column depending on only part of a composite key is a partial dependency, which breaks 2NF. Moving it to a table keyed by roll_no removes the redundancy."
          },
          {
            "id": "q_42",
            "question": "During a bank transfer the debit succeeds but the credit fails, so the database undoes the debit. Which ACID property ensures this?",
            "options": [
              "Consistency",
              "Atomicity",
              "Isolation",
              "Durability"
            ],
            "correctAnswer": 1,
            "explanation": "Atomicity means a transaction is all-or-nothing. If any part fails, the whole transaction is rolled back."
          },
          {
            "id": "q_43",
            "question": "Process P1 holds resource A and waits for resource B, while process P2 holds B and waits for A. Neither can proceed. What is this situation called?",
            "options": [
              "Starvation",
              "Deadlock",
              "Thrashing",
              "Context switching"
            ],
            "correctAnswer": 1,
            "explanation": "Processes waiting on each other in a circular wait, each holding a resource the other needs, form a deadlock."
          },
          {
            "id": "q_44",
            "question": "A laptop runs many programs and its RAM is almost full, yet programs keep running because the OS temporarily uses part of the disk as extra memory. What is this technique called?",
            "options": [
              "Cache memory",
              "Virtual memory (paging or swapping)",
              "Spooling",
              "Disk defragmentation"
            ],
            "correctAnswer": 1,
            "explanation": "Virtual memory lets the OS extend RAM using disk space by moving pages in and out. Cache is faster memory near the CPU and spooling queues jobs for devices."
          },
          {
            "id": "q_45",
            "question": "A team delivers small working increments every two weeks, holds daily stand-ups and adapts to changing requirements. Which methodology is this?",
            "options": [
              "Agile (Scrum)",
              "Waterfall",
              "V-Model",
              "Big-bang integration"
            ],
            "correctAnswer": 0,
            "explanation": "Short iterations (sprints), daily stand-ups and adaptation to change are characteristics of Agile and Scrum. Waterfall and the V-Model are sequential."
          }
        ]
      }
    ],
    "id": "accenture-test-2"
  },
  {
    "title": "Accenture Technical Mock Test: Cloud Basics, Cloud Security & Networking",
    "description": "45 MCQs across three sections (15 each). Each question has one correct answer. Marking: +1 for correct, -0.25 for incorrect, 0 for unattempted. Duration: 45 minutes.",
    "durationMinutes": 45,
    "markingScheme": {
      "correct": 1,
      "incorrect": 0
    },
    "sections": [
      {
        "id": "sec_1",
        "name": "Cloud Basics",
        "questions": [
          {
            "id": "q_1",
            "question": "Which of the following is NOT an essential characteristic of cloud computing as defined by NIST?",
            "options": [
              "On-demand self-service",
              "Broad network access",
              "Resource pooling",
              "Fixed, manually provisioned capacity"
            ],
            "correctAnswer": 3,
            "explanation": "NIST lists on-demand self-service, broad network access, resource pooling, rapid elasticity and measured service. Fixed, manually provisioned capacity is the opposite of cloud elasticity."
          },
          {
            "id": "q_2",
            "question": "Which of the following is an example of Infrastructure as a Service (IaaS)?",
            "options": [
              "Gmail",
              "Amazon EC2",
              "Salesforce CRM",
              "Microsoft 365"
            ],
            "correctAnswer": 1,
            "explanation": "Amazon EC2 provides virtual machines (compute infrastructure). Gmail, Salesforce and Microsoft 365 are SaaS."
          },
          {
            "id": "q_3",
            "question": "Which cloud service model gives the customer the LEAST management responsibility?",
            "options": [
              "IaaS",
              "PaaS",
              "SaaS",
              "On-premises data center"
            ],
            "correctAnswer": 2,
            "explanation": "In SaaS the provider manages the application, runtime, OS and infrastructure; the customer mainly manages their data and access."
          },
          {
            "id": "q_4",
            "question": "A startup wants its developers to focus only on writing code while the provider handles servers, OS patching and the runtime. Which model fits best?",
            "options": [
              "PaaS",
              "IaaS",
              "Colocation",
              "Bare-metal hosting"
            ],
            "correctAnswer": 0,
            "explanation": "PaaS (e.g., Azure App Service, Google App Engine) abstracts servers, OS and runtime so developers deploy only code. IaaS leaves OS management to the customer."
          },
          {
            "id": "q_5",
            "question": "A bank keeps customer records in its own data center but uses a public cloud for its web front-end during traffic peaks. Which deployment model is this?",
            "options": [
              "Public cloud",
              "Private cloud",
              "Hybrid cloud",
              "Community cloud"
            ],
            "correctAnswer": 2,
            "explanation": "Combining private/on-premises infrastructure with a public cloud, with workloads coordinated between them, is a hybrid cloud."
          },
          {
            "id": "q_6",
            "question": "Automatically adding resources when demand rises and removing them when demand falls is called:",
            "options": [
              "Elasticity",
              "Multi-tenancy",
              "Replication",
              "Virtualization"
            ],
            "correctAnswer": 0,
            "explanation": "Elasticity is the ability to scale resources up and down automatically with demand."
          },
          {
            "id": "q_7",
            "question": "Moving from buying physical servers to renting cloud resources mainly shifts spending from:",
            "options": [
              "Operating expenditure to capital expenditure",
              "Capital expenditure to operating expenditure",
              "Fixed cost to zero cost",
              "Variable cost to fixed cost"
            ],
            "correctAnswer": 1,
            "explanation": "Cloud replaces large upfront hardware purchases (CapEx) with pay-as-you-go usage fees (OpEx)."
          },
          {
            "id": "q_8",
            "question": "Which of the following is a Type 1 (bare-metal) hypervisor?",
            "options": [
              "Oracle VirtualBox",
              "VMware Workstation",
              "VMware ESXi",
              "Parallels Desktop"
            ],
            "correctAnswer": 2,
            "explanation": "Type 1 hypervisors run directly on hardware (ESXi, Hyper-V, KVM). VirtualBox, Workstation and Parallels are Type 2 and run on top of a host OS."
          },
          {
            "id": "q_9",
            "question": "How do containers differ from virtual machines?",
            "options": [
              "Each container carries a full guest operating system",
              "Each container needs its own hypervisor",
              "Containers cannot run in the cloud",
              "Containers share the host OS kernel, so they are lighter and start faster"
            ],
            "correctAnswer": 3,
            "explanation": "Containers package the app and its dependencies but share the host kernel, so they are smaller and faster to start than VMs, which each include a guest OS."
          },
          {
            "id": "q_10",
            "question": "Under the shared responsibility model for IaaS, who is responsible for patching the guest operating system of a virtual machine?",
            "options": [
              "The cloud provider",
              "The customer",
              "Both equally",
              "The internet service provider"
            ],
            "correctAnswer": 1,
            "explanation": "In IaaS the provider secures the physical infrastructure and hypervisor; the customer manages the guest OS, applications and data."
          },
          {
            "id": "q_11",
            "question": "An application must keep running even if a single data center in a region fails. What is the best approach?",
            "options": [
              "Deploy across multiple availability zones behind a load balancer",
              "Run everything in one availability zone on a larger instance",
              "Take weekly backups to a local disk",
              "Increase the CPU count of the server"
            ],
            "correctAnswer": 0,
            "explanation": "Availability zones are isolated data centers within a region. Spreading instances across zones removes the single point of failure; larger instances do not."
          },
          {
            "id": "q_12",
            "question": "Which statement best describes serverless computing (e.g., AWS Lambda)?",
            "options": [
              "You manage and patch the servers but pay monthly",
              "A dedicated physical server is required",
              "It can only run on-premises",
              "Code runs on demand, the provider manages the infrastructure, and billing is per execution"
            ],
            "correctAnswer": 3,
            "explanation": "Serverless platforms run your functions on demand, scale automatically, hide server management and bill by usage (invocations and duration)."
          },
          {
            "id": "q_13",
            "question": "An app must store millions of user-uploaded photos and videos cheaply, with HTTP access and virtually unlimited scale. Which storage type is the best fit?",
            "options": [
              "Block storage attached to a single VM",
              "A relational database",
              "Object storage such as Amazon S3",
              "CPU cache"
            ],
            "correctAnswer": 2,
            "explanation": "Object storage is built for large volumes of unstructured data accessed over HTTP APIs. Block storage suits VM disks; relational databases suit structured data."
          },
          {
            "id": "q_14",
            "question": "A global news website wants to reduce latency for readers worldwide by serving static content from locations near them. What should it use?",
            "options": [
              "Add more RAM to the origin server",
              "A Content Delivery Network (CDN)",
              "A larger relational database",
              "A single bigger region"
            ],
            "correctAnswer": 1,
            "explanation": "A CDN caches content at edge locations close to users, reducing latency and load on the origin."
          },
          {
            "id": "q_15",
            "question": "An online store expects unpredictable traffic spikes during a flash sale and must avoid both downtime and overpaying for idle servers. Which combination is most suitable?",
            "options": [
              "An Auto Scaling group with a load balancer",
              "Buy enough fixed servers for the peak",
              "Manually add servers when customers complain",
              "One very large instance"
            ],
            "correctAnswer": 0,
            "explanation": "Auto scaling adds and removes instances with demand, and the load balancer spreads traffic across them. Fixed or manual capacity wastes money or risks downtime."
          }
        ]
      },
      {
        "id": "sec_2",
        "name": "Cloud Security",
        "questions": [
          {
            "id": "q_16",
            "question": "In the shared responsibility model, which responsibility always remains with the customer regardless of the service model?",
            "options": [
              "Physical security of data centers",
              "Protecting and classifying their own data and managing who can access it",
              "Maintaining the hypervisor",
              "Power and cooling of the facility"
            ],
            "correctAnswer": 1,
            "explanation": "Even in SaaS, customers remain responsible for their data, identities and access. Physical security, power and hypervisors are provider responsibilities."
          },
          {
            "id": "q_17",
            "question": "A junior analyst only needs to read reports stored in one storage bucket. Which IAM approach follows the principle of least privilege?",
            "options": [
              "Grant admin access so no further requests are needed",
              "Grant full storage access to all analysts",
              "Grant read/write access to all buckets",
              "Grant read-only permission scoped to that bucket only"
            ],
            "correctAnswer": 3,
            "explanation": "Least privilege means giving only the minimum permissions needed, for only the required resources."
          },
          {
            "id": "q_18",
            "question": "A user signs in with a password and then enters a one-time code from an authenticator app. Which concept is this?",
            "options": [
              "Multi-factor authentication",
              "Single sign-on",
              "Federation",
              "Role-based access control"
            ],
            "correctAnswer": 0,
            "explanation": "MFA combines factors from different categories: something you know (password) and something you have (authenticator app)."
          },
          {
            "id": "q_19",
            "question": "Two cloud services that have never shared a key must exchange a very large dataset securely and efficiently. Which design is best?",
            "options": [
              "Encrypt the whole dataset directly with RSA",
              "Hash the dataset with MD5 and send the hash",
              "Agree on a key with asymmetric cryptography (ECDHE/RSA), then encrypt the data with AES-GCM",
              "Use DES with a shared password"
            ],
            "correctAnswer": 2,
            "explanation": "Hybrid encryption uses asymmetric crypto for key exchange and fast symmetric crypto for bulk data. RSA is too slow for bulk data, MD5 gives no confidentiality, and DES is broken."
          },
          {
            "id": "q_20",
            "question": "To prove that a document came from a specific sender and was not altered, the sender should:",
            "options": [
              "Encrypt it with the receiver's private key",
              "Sign its hash with the sender's private key",
              "Hash it with MD5 only",
              "Encode it in Base64"
            ],
            "correctAnswer": 1,
            "explanation": "A digital signature (hash signed with the sender's private key) gives integrity, authentication and non-repudiation. Base64 is only encoding; MD5 alone has no key."
          },
          {
            "id": "q_21",
            "question": "In envelope encryption, what encrypts the data encryption key (DEK)?",
            "options": [
              "The plaintext data",
              "A hash of the DEK",
              "The user's password",
              "A key encryption key (KEK) held in a KMS"
            ],
            "correctAnswer": 3,
            "explanation": "The DEK encrypts the data, and the KEK (master key in a KMS/HSM) encrypts the DEK. Rotating the KEK only requires re-wrapping DEKs."
          },
          {
            "id": "q_22",
            "question": "Which is the best way to store user passwords?",
            "options": [
              "A slow, salted hash such as bcrypt or Argon2",
              "AES in ECB mode with a shared key",
              "A plain SHA-256 hash",
              "Base64 encoding"
            ],
            "correctAnswer": 0,
            "explanation": "Password storage needs a deliberately slow, salted hash. Plain SHA-256 is too fast to brute-force safely, ECB leaks patterns, and Base64 is reversible encoding."
          },
          {
            "id": "q_23",
            "question": "A developer accidentally commits a cloud access key to a public repository. What is the BEST immediate response?",
            "options": [
              "Delete the commit and do nothing else",
              "Wait and see whether any abuse occurs",
              "Deactivate and rotate the key, then review audit logs for misuse",
              "Rename the repository"
            ],
            "correctAnswer": 2,
            "explanation": "Once exposed, a key must be treated as compromised: revoke and rotate it, then check logs. Deleting the commit does not remove copies already scraped."
          },
          {
            "id": "q_24",
            "question": "Which control protects data in transit between a browser and a cloud API?",
            "options": [
              "AES-256 disk encryption on the storage volume",
              "TLS 1.2/1.3",
              "KMS key rotation",
              "Object versioning"
            ],
            "correctAnswer": 1,
            "explanation": "TLS encrypts data moving across the network. Disk encryption protects data at rest; key rotation and versioning do not protect traffic."
          },
          {
            "id": "q_25",
            "question": "A web application is being hit by SQL injection and cross-site scripting attempts. Which service filters such HTTP-layer attacks?",
            "options": [
              "VPN gateway",
              "DHCP server",
              "NAT gateway",
              "Web Application Firewall (WAF)"
            ],
            "correctAnswer": 3,
            "explanation": "A WAF inspects HTTP/HTTPS requests (Layer 7) and blocks patterns such as SQL injection and XSS."
          },
          {
            "id": "q_26",
            "question": "What is the most common cause of cloud data breaches?",
            "options": [
              "Misconfiguration, such as publicly exposed storage buckets",
              "Mathematically breaking AES-256",
              "Hypervisor zero-day exploits",
              "Stolen physical disks from provider data centers"
            ],
            "correctAnswer": 0,
            "explanation": "Customer-side misconfiguration (open buckets, overly broad permissions) causes far more breaches than cryptographic or hypervisor attacks."
          },
          {
            "id": "q_27",
            "question": "A law firm wants cloud storage where neither the provider nor a breach at the provider can expose plaintext. Which approach should it use?",
            "options": [
              "Server-side encryption with provider-managed keys",
              "TLS during upload only",
              "Client-side encryption with keys kept by the firm",
              "A public bucket with a long random URL"
            ],
            "correctAnswer": 2,
            "explanation": "With client-side encryption the provider only sees ciphertext and never holds the keys. Provider-managed keys let the provider decrypt; TLS only protects data in transit."
          },
          {
            "id": "q_28",
            "question": "Which principle best describes the zero trust security model?",
            "options": [
              "Trust everything inside the corporate network",
              "Never trust, always verify every request",
              "Trust all users who have completed MFA once, permanently",
              "Trust only traffic that arrives through the VPN"
            ],
            "correctAnswer": 1,
            "explanation": "Zero trust assumes no implicit trust based on network location. Every request is authenticated, authorized and continuously verified."
          },
          {
            "id": "q_29",
            "question": "A website is flooded with traffic from thousands of compromised devices and becomes unavailable. Which attack is this, and what is a suitable mitigation?",
            "options": [
              "Phishing; user training only",
              "SQL injection; parameterized queries",
              "Man-in-the-middle; TLS only",
              "DDoS; traffic filtering and rate limiting through a CDN or DDoS protection service"
            ],
            "correctAnswer": 3,
            "explanation": "Overwhelming a service with distributed traffic is a DDoS attack. Mitigation uses edge filtering, rate limiting and scrubbing services."
          },
          {
            "id": "q_30",
            "question": "An auditor requires encryption at rest, a log of every use of the encryption key, and the ability to cut off access to data by disabling the key. Which option satisfies all three?",
            "options": [
              "Server-side encryption with a customer-managed KMS key",
              "Provider-managed default keys with no logging",
              "Unencrypted storage with strict ACLs",
              "Base64-encoding the files"
            ],
            "correctAnswer": 0,
            "explanation": "A customer-managed KMS key gives encryption, key-usage audit logs, and a kill switch via disabling the key. The other options lack encryption or control."
          }
        ]
      },
      {
        "id": "sec_3",
        "name": "Networking",
        "questions": [
          {
            "id": "q_31",
            "question": "At which OSI layer do routers operate to forward packets using IP addresses?",
            "options": [
              "Layer 1 (Physical)",
              "Layer 2 (Data Link)",
              "Layer 3 (Network)",
              "Layer 4 (Transport)"
            ],
            "correctAnswer": 2,
            "explanation": "Routing based on IP addresses happens at the Network layer (Layer 3)."
          },
          {
            "id": "q_32",
            "question": "Which protocol is connectionless and does not guarantee delivery, making it suitable for live streaming and DNS queries?",
            "options": [
              "UDP",
              "TCP",
              "FTP",
              "HTTP"
            ],
            "correctAnswer": 0,
            "explanation": "UDP is connectionless with low overhead and no delivery guarantee. TCP is connection-oriented and reliable."
          },
          {
            "id": "q_33",
            "question": "Which default port does SSH use?",
            "options": [
              "21",
              "22",
              "23",
              "25"
            ],
            "correctAnswer": 1,
            "explanation": "SSH uses port 22. Port 21 is FTP, 23 is Telnet and 25 is SMTP."
          },
          {
            "id": "q_34",
            "question": "Which service translates a domain name such as example.com into an IP address?",
            "options": [
              "DHCP",
              "NAT",
              "ARP",
              "DNS"
            ],
            "correctAnswer": 3,
            "explanation": "DNS (Domain Name System) resolves domain names to IP addresses."
          },
          {
            "id": "q_35",
            "question": "A new laptop joins a network and automatically receives an IP address, subnet mask and default gateway. Which protocol provided these?",
            "options": [
              "DNS",
              "ICMP",
              "DHCP",
              "SMTP"
            ],
            "correctAnswer": 2,
            "explanation": "DHCP assigns IP configuration automatically to devices joining a network."
          },
          {
            "id": "q_36",
            "question": "How many usable host addresses does a /24 IPv4 network (e.g., 192.168.1.0/24) have?",
            "options": [
              "254",
              "256",
              "255",
              "252"
            ],
            "correctAnswer": 0,
            "explanation": "A /24 has 2^8 = 256 addresses; subtracting the network and broadcast addresses leaves 254 usable hosts."
          },
          {
            "id": "q_37",
            "question": "Which of the following is a private IPv4 address?",
            "options": [
              "172.32.10.5",
              "172.20.5.4",
              "192.169.1.10",
              "11.0.0.1"
            ],
            "correctAnswer": 1,
            "explanation": "Private ranges are 10.0.0.0/8, 172.16.0.0 to 172.31.255.255 and 192.168.0.0/16. 172.20.5.4 falls inside the 172.16-172.31 range."
          },
          {
            "id": "q_38",
            "question": "Many devices on a private network share a single public IP address to access the internet. Which technique enables this?",
            "options": [
              "DNS",
              "Subnetting",
              "Proxy ARP",
              "NAT"
            ],
            "correctAnswer": 3,
            "explanation": "Network Address Translation maps private addresses (and ports) to a public address."
          },
          {
            "id": "q_39",
            "question": "A Layer 2 switch forwards frames within a LAN using which address?",
            "options": [
              "IP address",
              "Port number",
              "MAC address",
              "Domain name"
            ],
            "correctAnswer": 2,
            "explanation": "Switches learn and use MAC addresses (Layer 2) to forward frames to the right port."
          },
          {
            "id": "q_40",
            "question": "What is the sequence of the TCP three-way handshake?",
            "options": [
              "SYN, ACK, SYN-ACK",
              "SYN, SYN-ACK, ACK",
              "ACK, SYN, FIN",
              "SYN, FIN, ACK"
            ],
            "correctAnswer": 1,
            "explanation": "The client sends SYN, the server replies SYN-ACK, and the client completes with ACK."
          },
          {
            "id": "q_41",
            "question": "Remote employees must securely reach the corporate network over the public internet. Which solution creates an encrypted tunnel for this?",
            "options": [
              "A VPN (e.g., IPsec or SSL VPN)",
              "A public DHCP server",
              "A plain HTTP proxy",
              "Telnet"
            ],
            "correctAnswer": 0,
            "explanation": "A VPN encrypts traffic through a tunnel over an untrusted network. Telnet and plain HTTP proxies send data unencrypted."
          },
          {
            "id": "q_42",
            "question": "The ping command uses which protocol?",
            "options": [
              "TCP",
              "UDP",
              "SMTP",
              "ICMP"
            ],
            "correctAnswer": 3,
            "explanation": "Ping sends ICMP echo request and reply messages to test reachability."
          },
          {
            "id": "q_43",
            "question": "In a cloud VPC, web servers must be reachable from the internet, the database must NOT be directly reachable, yet the database must still download patches. Which design is best?",
            "options": [
              "Put everything in a public subnet with public IPs",
              "Put the database in a public subnet protected only by a strong password",
              "Web servers in a public subnet, database in a private subnet using a NAT gateway for outbound updates",
              "Disable all internet access for the web servers"
            ],
            "correctAnswer": 2,
            "explanation": "A private subnet keeps the database unreachable from the internet, while a NAT gateway allows outbound-only access for patches. Web servers stay in a public subnet."
          },
          {
            "id": "q_44",
            "question": "Users can open a website by typing its IP address but not by typing its domain name. Which component is most likely failing?",
            "options": [
              "The switch's MAC address table",
              "DNS resolution",
              "The TCP three-way handshake",
              "The physical network cable"
            ],
            "correctAnswer": 1,
            "explanation": "If the IP works, connectivity is fine. Only name-to-IP translation is failing, which points to DNS."
          },
          {
            "id": "q_45",
            "question": "A stateful firewall allows an outbound request and automatically permits the matching return traffic. What does 'stateful' mean here?",
            "options": [
              "It tracks the state of connections",
              "It inspects only MAC addresses",
              "It operates only at Layer 1",
              "It encrypts all traffic that passes through"
            ],
            "correctAnswer": 0,
            "explanation": "Stateful firewalls keep a connection table, so replies to allowed outbound connections are automatically permitted. Cloud security groups behave this way."
          }
        ]
      }
    ],
    "id": "accenture-test-3"
  }
];

export const SAMPLE_TEMPLATE_JSON = {
  "title": "Custom Mock Test Title",
  "description": "Test description",
  "durationMinutes": 45,
  "markingScheme": {
    "correct": 1,
    "incorrect": 0
  },
  "sections": [
    {
      "id": "sec_1",
      "name": "Technical Section",
      "questions": [
        {
          "id": "q_1",
          "question": "Sample question prompt?",
          "options": [
            "Option A",
            "Option B",
            "Option C",
            "Option D"
          ],
          "correctAnswer": 0,
          "explanation": "Reason for correct answer."
        }
      ]
    }
  ]
};
