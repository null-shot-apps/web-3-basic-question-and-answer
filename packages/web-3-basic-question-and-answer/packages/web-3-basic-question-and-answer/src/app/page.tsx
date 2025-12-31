'use client';

export default function Web3QA() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Web3 Q&A for Builders
          </h1>
          <p className="text-slate-400 text-lg">
            Practical answers to real engineering questions
          </p>
        </div>

        {/* Question Card */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">❓</span>
            <div>
              <h2 className="text-2xl font-semibold text-purple-300 mb-2">Question</h2>
              <p className="text-xl text-slate-200 leading-relaxed">
                How do I prevent reentrancy attacks in my smart contract when transferring ETH?
              </p>
            </div>
          </div>
        </div>

        {/* Answer Section */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-6">
            <span className="text-3xl">💡</span>
            <div className="flex-1">
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">Answer</h2>
              <div className="space-y-4 text-slate-300 leading-relaxed">
                <p>
                  Reentrancy is one of the most dangerous vulnerabilities in smart contracts. It happens when an external call allows the called contract to re-enter your function before the first execution completes.
                </p>
                <p className="font-medium text-purple-200">
                  The solution: Use the <span className="text-pink-400">Checks-Effects-Interactions</span> pattern.
                </p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li><strong className="text-purple-300">Checks:</strong> Validate conditions first</li>
                  <li><strong className="text-purple-300">Effects:</strong> Update state variables</li>
                  <li><strong className="text-purple-300">Interactions:</strong> Make external calls last</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Code Example */}
        <div className="bg-slate-900/50 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-start gap-3 mb-4">
            <span className="text-3xl">⚡</span>
            <h2 className="text-2xl font-semibold text-purple-300">Code Example</h2>
          </div>
          
          {/* Bad Example */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-red-400 text-xl">❌</span>
              <h3 className="text-lg font-semibold text-red-400">Vulnerable Code</h3>
            </div>
            <pre className="bg-slate-950 border border-red-500/30 rounded-xl p-6 overflow-x-auto">
              <code className="text-sm text-slate-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract VulnerableWithdraw {
    mapping(address => uint256) public balances;
    
    function withdraw() external {
        uint256 amount = balances[msg.sender];
        
        // ⚠️ DANGER: External call before state update
        (bool success, ) = msg.sender.call{value: amount}(\"\");
        require(success, \"Transfer failed\");
        
        // State updated AFTER external call
        balances[msg.sender] = 0;
    }
}`}</code>
            </pre>
          </div>

          {/* Good Example */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-green-400 text-xl">✅</span>
              <h3 className="text-lg font-semibold text-green-400">Secure Code</h3>
            </div>
            <pre className="bg-slate-950 border border-green-500/30 rounded-xl p-6 overflow-x-auto">
              <code className="text-sm text-slate-300">{`// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract SecureWithdraw {
    mapping(address => uint256) public balances;
    
    function withdraw() external {
        // 1. CHECKS: Validate conditions
        uint256 amount = balances[msg.sender];
        require(amount > 0, \"No balance\");
        
        // 2. EFFECTS: Update state BEFORE external call
        balances[msg.sender] = 0;
        
        // 3. INTERACTIONS: External call happens last
        (bool success, ) = msg.sender.call{value: amount}(\"\");
        require(success, \"Transfer failed\");
    }
    
    // Alternative: Use ReentrancyGuard from OpenZeppelin
    // import \"@openzeppelin/contracts/security/ReentrancyGuard.sol\";
    // contract SecureWithdraw is ReentrancyGuard {
    //     function withdraw() external nonReentrant { ... }
    // }
}`}</code>
            </pre>
          </div>
        </div>

        {/* Security Note */}
        <div className="bg-red-950/30 backdrop-blur-sm border border-red-500/30 rounded-2xl p-8 mb-8 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🔒</span>
            <div>
              <h2 className="text-2xl font-semibold text-red-300 mb-4">Security Considerations</h2>
              <ul className="space-y-3 text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-red-300">Always update state before external calls</strong> — this prevents attackers from exploiting stale state</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-red-300">Use OpenZeppelin&apos;s ReentrancyGuard</strong> — battle-tested modifier that blocks reentrant calls</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-red-300">Prefer pull over push payments</strong> — let users withdraw instead of automatically sending funds</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-400 mt-1">•</span>
                  <span><strong className="text-red-300">Test with malicious contracts</strong> — simulate reentrancy attacks in your test suite</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Best Practice */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 backdrop-blur-sm border border-purple-500/30 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-start gap-3">
            <span className="text-3xl">🎯</span>
            <div>
              <h2 className="text-2xl font-semibold text-purple-300 mb-4">Key Takeaway</h2>
              <p className="text-slate-200 text-lg leading-relaxed">
                <strong className="text-purple-300">Reentrancy killed The DAO ($60M+ hack).</strong> Don&apos;t let it kill your protocol. 
                Always follow Checks-Effects-Interactions, use ReentrancyGuard for complex logic, and test with attack scenarios. 
                When in doubt, update state first, call external contracts last.
              </p>
              <div className="mt-6 pt-6 border-t border-purple-500/20">
                <p className="text-slate-400 italic">
                  &quot;In Web3, security isn&apos;t optional — it&apos;s the foundation. Build with paranoia, ship with confidence.&quot;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



