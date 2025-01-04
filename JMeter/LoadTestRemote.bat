@echo Testing Current Minimum

@del .\jmeter.log
@rmdir /s /q .\rcMinLogs
@rmdir /s /q .\rcMinReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\RCurrentMinTestPlan.jmx -l .\rcMinLogs\rcMin.jtl -e -o .\rcMinReport\

@echo Testing Current Maximum

@del .\jmeter.log
@rmdir /s /q .\rcMaxLogs
@rmdir /s /q .\rcMaxReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\RCurrentMaxTestPlan.jmx -l .\rcMaxLogs\rcMax.jtl -e -o .\rcMaxReport\

@echo Testing Five Year Minimum

@del .\jmeter.log
@rmdir /s /q .\rfMinLogs
@rmdir /s /q .\rfMinReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\RFiveMinTestPlan.jmx -l .\rfMinLogs\rfMin.jtl -e -o .\rfMinReport\

@echo Testing Five Year Maximum

@del .\jmeter.log
@rmdir /s /q .\rfMaxLogs
@rmdir /s /q .\rfMaxReport

@call .\apache-jmeter-5.6.3\bin\jmeter -n -t .\RFiveMaxTestPlan.jmx -l .\rfMaxLogs\rfMax.jtl -e -o .\rfMaxReport\