import { PacketGraph } from '@/components/dashboard/PacketGraph';
import { AlertTable } from '@/components/dashboard/AlertTable';
import { StatusCard } from '@/components/dashboard/StatusCard';
import { LiveMonitor } from '@/components/dashboard/LiveMonitor';
import { AttackTimeline } from '@/components/dashboard/AttackTimeline';
import { AttackMap } from '@/components/dashboard/AttackMap';
import { ThreatIntelligence } from '@/components/dashboard/ThreatIntelligence';
import { NetworkPerformance } from '@/components/dashboard/NetworkPerformance';
import { SystemHealth } from '@/components/dashboard/SystemHealth';
import { SecurityMetrics } from '@/components/dashboard/SecurityMetrics';
import { BackgroundPattern } from '@/components/dashboard/BackgroundPattern';
import TrafficOverviewGraph from '@/components/dashboard/TrafficOverviewGraph';
import TopThreatSources from '@/components/dashboard/TopThreatSources';
import ProtocolDistribution from '@/components/dashboard/ProtocolDistribution';
import VulnerabilityHeatmap from '@/components/dashboard/VulnerabilityHeatmap';
import AIThreatSummary from '@/components/dashboard/AIThreatSummary';

export default function Dashboard() {
  return (
    <div className="flex-1 flex flex-col gap-4 xl:gap-6 p-4 md:p-6 xl:p-8 pt-4 md:pt-6 fade-in bg-background relative">
      {/* Animated Background Pattern */}
      <BackgroundPattern />
      
      {/* Dashboard Title - Above Everything */}
      <div className="flex items-center justify-center gap-3 relative z-10 mb-4">
        <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
           <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-cyber-blue">
             <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"></path>
           </svg>
         </div>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-cyber-blue slide-in text-center">
          Network Security Dashboard
        </h2>
      </div>
      
      {/* Dashboard Description */}
       <div className="text-center relative z-10 mb-6 px-4">
         <p className="text-base md:text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
           Comprehensive real-time network security monitoring and threat analysis platform. 
           Monitor network traffic, analyze security alerts, track threat intelligence, 
           and maintain system health with advanced visualization tools and AI-powered insights.
         </p>
         <div className="mt-3 flex flex-wrap justify-center gap-2 text-sm text-muted-foreground/80">
           <span className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">Real-time Monitoring</span>
           <span className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">Threat Detection</span>
           <span className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">Network Analysis</span>
           <span className="px-3 py-1 bg-primary/5 rounded-full border border-primary/10">AI Insights</span>
         </div>
       </div>
       
       {/* Dashboard Tutorial and Insights */}
       <div className="relative z-10 mb-8 px-4">
         <div className="max-w-6xl mx-auto">
           <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
             {/* Left Panel Components Guide */}
             <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-5 space-y-4">
               <div className="flex items-center gap-2 mb-3">
                 <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                     <path d="M3 3v18h18"/>
                     <path d="m19 9-5 5-4-4-3 3"/>
                   </svg>
                 </div>
                 <h3 className="font-semibold text-lg">Analytics Panel</h3>
               </div>
               <div className="space-y-3 text-sm text-muted-foreground">
                 <div>
                   <span className="font-medium text-foreground">Traffic Overview:</span> Real-time network bandwidth and packet flow visualization with trend analysis
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Threat Sources:</span> Geographic mapping of attack origins with IP reputation scoring
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Protocol Distribution:</span> Network traffic breakdown by protocol types (TCP/UDP/HTTP/HTTPS)
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Vulnerability Heatmap:</span> Most targeted ports and services with attack frequency metrics
                 </div>
                 <div>
                   <span className="font-medium text-foreground">AI Threat Summary:</span> Machine learning-powered threat intelligence and attack pattern analysis
                 </div>
               </div>
             </div>
             
             {/* Main Dashboard Components Guide */}
             <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-5 space-y-4">
               <div className="flex items-center gap-2 mb-3">
                 <div className="p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                     <rect width="18" height="18" x="3" y="3" rx="2"/>
                     <path d="M9 9h6v6H9z"/>
                   </svg>
                 </div>
                 <h3 className="font-semibold text-lg">Main Dashboard</h3>
               </div>
               <div className="space-y-3 text-sm text-muted-foreground">
                 <div>
                   <span className="font-medium text-foreground">Live Monitor:</span> Real-time security event stream with severity classification and timestamps
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Status Cards:</span> System health indicators including CPU, memory, and network performance
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Packet Graph:</span> Network traffic visualization with packet rate and bandwidth metrics
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Security Alerts:</span> Comprehensive alert table with filtering, search, and severity-based sorting
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Attack Timeline:</span> Chronological view of security incidents with impact assessment
                 </div>
                 <div>
                   <span className="font-medium text-foreground">Attack Map:</span> Global threat visualization showing attack sources and targets
                 </div>
               </div>
             </div>
             
             {/* Key Indicators and Metrics Guide */}
             <div className="bg-card/50 backdrop-blur-sm border rounded-lg p-5 space-y-4">
               <div className="flex items-center gap-2 mb-3">
                 <div className="p-2 rounded-lg bg-purple-500/10 border border-purple-500/20">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                     <path d="M22 12h-4l-3 9L9 3l-3 9H2"/>
                   </svg>
                 </div>
                 <h3 className="font-semibold text-lg">Key Indicators</h3>
               </div>
               <div className="space-y-3 text-sm text-muted-foreground">
                 <div>
                   <span className="font-medium text-red-500">Critical Alerts:</span> Immediate attention required - potential system compromise or active attacks
                 </div>
                 <div>
                   <span className="font-medium text-orange-500">High Priority:</span> Significant security events requiring investigation within 1 hour
                 </div>
                 <div>
                   <span className="font-medium text-yellow-500">Medium Priority:</span> Notable security activities for monitoring and analysis
                 </div>
                 <div>
                   <span className="font-medium text-blue-500">Low Priority:</span> Informational events and routine security scanning activities
                 </div>
                 <div>
                   <span className="font-medium text-green-500">System Health:</span> Performance metrics including CPU usage, memory consumption, and network throughput
                 </div>
                 <div>
                   <span className="font-medium text-cyan-500">Threat Intelligence:</span> External threat feeds, IOCs, and security advisories integration
                 </div>
               </div>
             </div>
           </div>
           
           {/* Usage Tips and Best Practices */}
           <div className="mt-6 bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-500/20 rounded-lg p-6">
             <div className="flex items-center gap-3 mb-4">
               <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                   <circle cx="12" cy="12" r="10"/>
                   <path d="M12 16v-4"/>
                   <path d="M12 8h.01"/>
                 </svg>
               </div>
               <h3 className="text-xl font-semibold">Dashboard Usage Tips & Best Practices</h3>
             </div>
             <div className="grid gap-4 md:grid-cols-2">
               <div className="space-y-3">
                 <h4 className="font-medium text-lg mb-2">🎯 Monitoring Workflow</h4>
                 <ul className="space-y-2 text-sm text-muted-foreground">
                   <li>• Start with the <span className="font-medium text-foreground">Live Monitor</span> for real-time threat awareness</li>
                   <li>• Check <span className="font-medium text-foreground">System Health</span> cards for performance baselines</li>
                   <li>• Review <span className="font-medium text-foreground">Security Alerts</span> table for detailed incident analysis</li>
                   <li>• Use <span className="font-medium text-foreground">Attack Map</span> to identify geographic threat patterns</li>
                   <li>• Analyze <span className="font-medium text-foreground">Traffic Overview</span> for bandwidth anomalies</li>
                 </ul>
               </div>
               <div className="space-y-3">
                 <h4 className="font-medium text-lg mb-2">⚡ Quick Actions</h4>
                 <ul className="space-y-2 text-sm text-muted-foreground">
                   <li>• Filter alerts by severity using the dropdown controls</li>
                   <li>• Search specific IPs or attack types in the alert table</li>
                   <li>• Monitor protocol distribution for unusual traffic patterns</li>
                   <li>• Track vulnerability heatmap for targeted services</li>
                   <li>• Review AI insights for automated threat correlation</li>
                 </ul>
               </div>
             </div>
           </div>
         </div>
       </div>

       {/* Quick Stats Overview */}
       <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
         <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 rounded-lg p-4">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-muted-foreground">Active Connections</p>
               <p className="text-2xl font-bold text-green-500">1,247</p>
             </div>
             <div className="p-2 rounded-lg bg-green-500/10">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500">
                 <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                 <path d="M2 17l10 5 10-5"/>
                 <path d="M2 12l10 5 10-5"/>
               </svg>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-lg p-4">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-muted-foreground">Data Processed</p>
               <p className="text-2xl font-bold text-blue-500">2.4 TB</p>
             </div>
             <div className="p-2 rounded-lg bg-blue-500/10">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500">
                 <ellipse cx="12" cy="5" rx="9" ry="3"/>
                 <path d="M3 5v14c0 1.66 4.03 3 9 3s9-1.34 9-3V5"/>
                 <path d="M3 12c0 1.66 4.03 3 9 3s9-1.34 9-3"/>
               </svg>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-muted-foreground">Threats Blocked</p>
               <p className="text-2xl font-bold text-orange-500">89</p>
             </div>
             <div className="p-2 rounded-lg bg-orange-500/10">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-orange-500">
                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                 <path d="M9 12l2 2 4-4"/>
               </svg>
             </div>
           </div>
         </div>

         <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-lg p-4">
           <div className="flex items-center justify-between">
             <div>
               <p className="text-sm text-muted-foreground">System Uptime</p>
               <p className="text-2xl font-bold text-purple-500">99.9%</p>
             </div>
             <div className="p-2 rounded-lg bg-purple-500/10">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500">
                 <circle cx="12" cy="12" r="10"/>
                 <polyline points="12,6 12,12 16,14"/>
               </svg>
             </div>
           </div>
         </div>
       </div>

       {/* Recent Activity Feed */}
       <div className="mt-8 bg-gradient-to-r from-slate-500/5 to-gray-500/5 border border-slate-500/20 rounded-lg p-6">
         <div className="flex items-center gap-3 mb-4">
           <div className="p-2 rounded-lg bg-slate-500/10 border border-slate-500/20">
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500">
               <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
               <path d="M21 3v5h-5"/>
               <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
               <path d="M3 21v-5h5"/>
             </svg>
           </div>
           <h3 className="text-lg font-semibold">Recent Security Activity</h3>
         </div>
         <div className="space-y-3">
           <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/5 border border-green-500/10">
             <div className="w-2 h-2 rounded-full bg-green-500"></div>
             <div className="flex-1">
               <p className="text-sm font-medium">Firewall rule updated successfully</p>
               <p className="text-xs text-muted-foreground">2 minutes ago</p>
             </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
             <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
             <div className="flex-1">
               <p className="text-sm font-medium">Suspicious login attempt detected from 192.168.1.45</p>
               <p className="text-xs text-muted-foreground">5 minutes ago</p>
             </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
             <div className="w-2 h-2 rounded-full bg-blue-500"></div>
             <div className="flex-1">
               <p className="text-sm font-medium">Network scan completed - 247 devices discovered</p>
               <p className="text-xs text-muted-foreground">12 minutes ago</p>
             </div>
           </div>
           <div className="flex items-center gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
             <div className="w-2 h-2 rounded-full bg-red-500"></div>
             <div className="flex-1">
               <p className="text-sm font-medium">DDoS attack blocked from multiple IPs</p>
               <p className="text-xs text-muted-foreground">18 minutes ago</p>
             </div>
           </div>
         </div>
       </div>
      
      {/* Main Dashboard Content */}
      <div className="flex flex-col xl:flex-row gap-6 xl:gap-8">
        {/* Left Sidebar Panel */}
        <div className="w-full xl:w-80 space-y-4 xl:space-y-5 relative z-10 order-2 xl:order-1">
          {/* Traffic Overview */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.1s'}}>
            <TrafficOverviewGraph />
          </div>
          
          {/* Top Threat Sources */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.2s'}}>
            <TopThreatSources />
          </div>
          
          {/* Protocol Distribution */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.3s'}}>
            <ProtocolDistribution />
          </div>
          
          {/* Vulnerability Heatmap */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.4s'}}>
            <VulnerabilityHeatmap />
          </div>
          
          {/* AI Threat Summary */}
          <div className="animate-fade-in-up" style={{animationDelay: '0.5s'}}>
            <AIThreatSummary />
          </div>
        </div>
        
        {/* Main Content Area */}
        <div className="flex-1 space-y-5 xl:space-y-6 relative z-10 order-1 xl:order-2">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0">
            <div className="flex-1"></div>
            <LiveMonitor />
          </div>
        
        {/* Status Cards */}
        <div className="mb-2">
          <StatusCard />
        </div>
        
        {/* Main Dashboard Grid */}
        <div className="grid gap-4 xl:gap-6 grid-cols-1 lg:grid-cols-5">
          {/* Packet Graph - Takes 2 columns */}
          <PacketGraph />
          
          {/* Alert Table - Takes 3 columns */}
          <AlertTable />
        </div>
        
        {/* Second Row - Timeline and Map */}
        <div className="grid gap-4 xl:gap-6 grid-cols-1 lg:grid-cols-2 mt-6 xl:mt-8">
          {/* Attack Timeline */}
          <AttackTimeline />
          
          {/* Attack Map */}
          <AttackMap />
        </div>
        
        {/* Third Row - Threat Intelligence and Network Performance */}
        <div className="grid gap-4 xl:gap-6 grid-cols-1 lg:grid-cols-2 mt-6 xl:mt-8">
          <ThreatIntelligence />
          <NetworkPerformance />
        </div>
        
        {/* Fourth Row - System Health and Security Metrics */}
        <div className="grid gap-4 xl:gap-6 grid-cols-1 lg:grid-cols-2 mt-6 xl:mt-8">
          <SystemHealth />
          <SecurityMetrics />
        </div>
        </div>
      </div>
    </div>
  );
}