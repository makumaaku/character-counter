'use client'

import { useState, useEffect, useRef } from 'react'

export default function Home() {
  const [text, setText] = useState('')
  const [searchString, setSearchString] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [placeholderText, setPlaceholderText] = useState('テキストを入力してください')
  const animationIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const animationStartedRef = useRef(false)

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current)
    }
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchString(e.target.value)
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    } catch (error) {
      console.error('コピーに失敗しました:', error)
      setShowToast(true)
      setTimeout(() => setShowToast(false), 2000)
    }
  }

  useEffect(() => {
    if (!animationStartedRef.current) {
      animationStartedRef.current = true
      const fullPlaceholder = '...'
      let i = 0
      const animate = () => {
        if (i < fullPlaceholder.length) {
          setPlaceholderText('テキストを入力してください' + fullPlaceholder.substring(0, i + 1))
          i++
        } else {
          i = 0
        }
      }
      animationIntervalRef.current = setInterval(animate, 300)
    }
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current)
      }
    }
  }, [])

  const charCount = text.length
  const newlineCount = (text.match(/\n/g) || []).length
  const wordCount = text.trim() === '' ? 0 : text.trim().split(/\s+/).length
  const byteCount = new TextEncoder().encode(text).length

  const countOccurrences = (str: string, searchStr: string) => {
    if (!searchStr) return 0
    return (str.match(new RegExp(searchStr, 'g')) || []).length
  }

  return (
    <div className="bg-gray-800 text-gray-100 font-sans">
      <header className="bg-purple-500 text-white flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Boring.</h1>
        <h2 className="text-xl">文字数カウンター</h2>
        <div className="w-[76px]"></div>
      </header>

      <main className="max-w-4xl mx-auto mt-10 px-4 pb-24">
        <div className="bg-gray-700 p-6 rounded-lg text-center">
          <h2 className="text-xl mb-4">文字数</h2>
          <p className="text-4xl font-bold">{charCount}</p>
        </div>

        <textarea
          className="w-full mt-6 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          placeholder={placeholderText}
          rows={6}
          value={text}
          onChange={handleChange}
        />

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">改行数</h3>
            <p className="text-3xl font-bold">{newlineCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">単語数</h3>
            <p className="text-3xl font-bold">{wordCount}</p>
          </div>
          <div className="bg-gray-700 p-4 rounded-lg text-center">
            <h3 className="text-lg mb-2">バイト数</h3>
            <p className="text-3xl font-bold">{byteCount}</p>
          </div>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h3 className="text-xl mb-4 text-center">文字列検索</h3>
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="検索文字列を入力"
              className="flex-1 bg-gray-900 text-gray-100 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchString}
              onChange={handleSearchChange}
            />
            {searchString && (
              <div className="bg-gray-800 p-4 rounded-lg flex-1 text-center">
                <span className="text-purple-400 font-mono">{searchString}</span>
                <span className="ml-2">の出現回数：</span>
                <span className="text-2xl font-bold ml-2">
                  {countOccurrences(text, searchString)}
                </span>
              </div>
            )}
          </div>
          
          {searchString && text && (
            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">検索結果のプレビュー：</p>
              <div className="font-mono break-all">
                {text.split(new RegExp(`(${searchString})`, 'g')).map((part, i) => 
                  part === searchString ? (
                    <span key={i} className="bg-purple-500 px-1 rounded">
                      {part}
                    </span>
                  ) : (
                    <span key={i}>{part}</span>
                  )
                )}
              </div>
            </div>
          )}

        <button
          onClick={handleCopy}
          className="mt-6 w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        >
          コピー
        </button>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">簡単＆シンプル！高性能な文字数カウントツール（無料）</h2>
          <p className="mb-4">無料で安心して使える当ツールは、リアルタイムカウントで文字数、改行数、バイト数を即座にチェック！
SNS投稿、エッセイ、広告文作成など、あらゆるシーンに最適です。
※ダークモード対応で、目に優しい拘りのデザイン！</p>
          <h3 className="text-lg mb-2 font-bold">使い方の簡単なステップ</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>テキストを入力
              <p className="ml-5">入力エリアに文章をコピー＆ペーストまたは直接入力・編集してください。
※入力するだけで、文字数、改行数、単語数（英語限定）、バイト数（マルチバイト対応）が瞬時にカウントされます。</p>
            </li>
            <li>リアルタイムで結果確認
              <p className="ml-5">入力と同時に、リアルタイムカウントにより各種数値が表示されるので、即座に確認可能です。</p>
            </li>
            <li>結果を活用
              <p className="ml-5">結果はコピーボタンでコピーが可能。
表示された数値を参考に、SNS投稿や広告文、論文作成などにご利用ください。</p>
            </li>
          </ul>

          <h3 className="text-lg mb-2 font-bold mt-6">サービスの特徴・メリット</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>簡単でシンプルな操作性で誰でもすぐに利用可能
              <p className="ml-5">テキストを入力するだけで、文字数、改行数、バイト数がリアルタイムカウントされ、正確な結果を表示します。</p>
            </li>
            <li>高性能な計算エンジン正確性に自信あり
              <p className="ml-5">複雑な文章や多言語にも対応。さらに文字数だけでなく、改行数、単語数（英語限定）、バイト数（マルチバイト対応）も同時にカウントできます。</p>
            </li>
            <li>無料版でコストを気にせず安心して利用できる！
              <p className="ml-5">無料で安心してご利用いただける設計に加え、プロプランではハイエンドな機能にも対応しています。</p>
            </li>
            <li>ダークモード対応で目に優しいデザイン
              <p className="ml-5">目に優しいダークモード機能を搭載。夜間や長時間の作業でも快適に使用できます。</p>
            </li>
          </ul>

          <h3 className="text-lg mb-2 font-bold mt-6">FAQ・よくある質問</h3>
          <div className="mb-4">
            <h4 className="font-bold">Q1. 文字数カウントアプリとは何ですか？</h4>
            <p className="ml-5">A: 文字数カウントアプリは、入力されたテキストの文字数を瞬時に計算し、正確な結果を表示するツールです。これにより、手作業でのカウントミスを防ぎ、効率的な文章作成や編集が可能となります。</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q2. どのようなシーンで利用できますか？</h4>
            <p className="ml-5">A: 主な利用シーンは以下の通りです。
              <ul className="list-disc pl-10">
                <li>ライティング・ブログ投稿: 記事作成時に、指定された文字数のガイドラインを守るために使用します。</li>
                <li>SNS投稿: Twitterや広告文など、文字数制限がある投稿において最適な長さを確認する際に活用します。</li>
                <li>SEO対策: 記事のボリューム管理や構成の調整により、検索エンジン向けの最適化を図ります。</li>
              </ul>
            </p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q3. 全角と半角はどのようにカウントされますか？</h4>
            <p className="ml-5">A: アプリによって仕様は異なりますが、基本的には全角文字と半角文字をそれぞれ適切に認識し、正確にカウントできる設計になっています。特殊な記号や改行も含めたカウントが可能な場合が多いです。ご利用前に仕様をご確認いただくことをおすすめします。</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q4. 複数の言語に対応していますか？</h4>
            <p className="ml-5">A: 多くの文字数カウントアプリは日本語だけでなく、英語やその他の言語にも対応しています。言語ごとの文字や記号の扱いを正確に処理するため、国際的な利用にも対応できる設計となっています。</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q5. 無料版と有料版の違いは何ですか？</h4>
            <p className="ml-5">A: アプリによって異なりますが、一般的には以下のような違いがあります。
              <ul className="list-disc pl-10">
                <li>無料版: 基本的な文字数カウント機能が利用可能。シンプルな機能に限定される場合が多い。</li>
                <li>有料版: 高度な統計情報（単語数、行数、スペースや記号のカウントなど）やカスタマイズ機能、他ツールとの連携機能、広告非表示などの追加機能が提供されることが一般的です。</li>
              </ul>
            </p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q6. 他のツールとの連携は可能ですか？</h4>
            <p className="ml-5">A: 一部の文字数カウントアプリでは、エディタやCMSとの連携機能が備わっており、作業効率をさらに向上させることができます。連携方法や対応ツールについては、各アプリの公式サイトやヘルプページで詳細をご確認ください。</p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold">Q7. サポートやアップデートはどうなっていますか？</h4>
            <p className="ml-5">A: 公式サイトやアプリ内のサポートページで、FAQ以外の質問にも対応するお問い合わせフォームやチャットサポートが用意されています。また、定期的に機能改善やセキュリティ対策のアップデートが行われ、安心して利用できる環境が整えられています。</p>
          </div>
          <div>
            <h4 className="font-bold">Q8. 利用にあたっての注意点はありますか？</h4>
            <p className="ml-5">A: 利用前に、以下の点をご確認ください。
              <ul className="list-disc pl-10">
                <li>文字数のカウントルール（全角・半角の扱いなど）</li>
                <li>対応している言語や記号の範囲</li>
                <li>無料版と有料版の機能差および料金体系</li>
                <li>プライバシーポリシーやデータの取り扱いについて</li>
              </ul>
            </p>
          </div>
          <p className="mt-4">上記のFAQに加え、ユーザーからのご質問やご意見を随時受け付けております。ご不明な点がある場合は、サポート窓口までお気軽にお問い合わせください。</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">文字数カウントアプリとは？</h2>
          <p className="mb-4">文字数カウントアプリは、入力したテキストの文字数を瞬時に計算し、その結果を表示するツールです。以下に、具体的な特徴と役割をご紹介します。</p>
          <h3 className="text-lg mb-2 font-bold">基本機能と役割</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>正確な文字数計測: テキストエディタやウェブフォームに入力した文章の文字数を自動で算出し、正確な結果を表示します。手作業での計数ミスや時間のロスを防止できます。</li>
            <li>リアルタイムのフィードバック: 入力するたびに文字数が更新されるため、目標の文字数に合わせながら効率的に文章を作成できます。</li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">利用されるシーン</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>ライティング・ブログ投稿: 記事やブログの投稿時に、指定された文字数のガイドラインを守る際に活用されます。</li>
            <li>SNSや広告文: Twitterや広告コピーなど、文字数制限があるプラットフォームで投稿前に最適な長さを確認するために利用されます。</li>
            <li>SEO対策: 記事のボリュームや構成を調整し、適切な文字数を維持するためのツールとしても用いられます。</li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">高度な機能と拡張性</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>多言語対応: 日本語に限らず、英語やその他の言語に対応するものもあり、全角・半角などの特殊な文字の違いを正確に把握できます。</li>
            <li>その他の統計情報: 文字数だけでなく、単語数や行数、スペースや記号のカウントなど、詳細な統計情報を提供する場合もあります。</li>
            <li>使いやすいインターフェース: シンプルで直感的なデザインが採用されており、初心者でもすぐに利用できる設計となっています。</li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">必要とされる理由</h3>
          <ul className="list-disc pl-5">
            <li>作業効率の向上: 手動で文字数を数える手間を省き、作業時間を短縮できます。</li>
            <li>ミスの防止: 手作業での誤差や抜け漏れを防ぎ、正確な文章作成を支援します。</li>
            <li>ルール遵守の支援: 文字数制限が厳しい媒体やフォーマットに対応するため、必要な基準を守る手助けとなります。</li>
          </ul>
          <p className="mt-4">以上の理由から、文字数カウントアプリはライティング、マーケティング、SEO対策など、さまざまなシーンで利用されるツールとして広く採用されています。</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">文字数カウントアプリの活用事例</h2>
          <p className="mb-4">文字数カウントアプリは、多くの場面で活用されています。以下に、具体的な事例をご紹介します！</p>
          <h3 className="text-lg mb-2 font-bold">1. ライティングやブログ投稿の際の利用</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>記事作成の効率化
              <p className="ml-5">ブログ記事やニュースレターを作成する際に、決められた文字数を超えないようにするため、文字数をリアルタイムで確認しながら文章を構築できます。これにより、締め切りや投稿ルールに合わせた記事作成が可能になります。</p>
            </li>
            <li>構成の調整
              <p className="ml-5">読みやすさやSEO対策として、段落ごとの文字数バランスを整えるときに利用されます。文章全体のボリュームを意識しながら、適切な長さの見出しや本文を作成する手助けとなります。</p>
            </li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">2. SNS投稿や広告文の作成での利用</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>文字数制限への対応
              <p className="ml-5">TwitterやFacebookなどのSNSでは、投稿に文字数制限が設けられているため、投稿前に適正な文字数かどうかを確認できます。これにより、重要なメッセージが途中で切れてしまうリスクを回避できます。</p>
            </li>
            <li>効果的な広告コピー作成
              <p className="ml-5">広告文やプロモーションメッセージにおいては、シンプルかつインパクトのある表現が求められます。文字数カウントアプリを活用することで、限られた文字数内で効果的なメッセージを作成するための調整がしやすくなります。</p>
            </li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">3. SEO対策における活用</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>最適な記事ボリュームの維持
              <p className="ml-5">SEO対策として、検索エンジンが評価する記事のボリュームやキーワードの配置を調整する際に、文字数カウントアプリが役立ちます。目安となる文字数を維持することで、記事全体のクオリティが向上します。</p>
            </li>
            <li>構造化されたコンテンツ作成
              <p className="ml-5">検索結果で上位表示を狙うために、見出しや本文の文字数を適切に管理し、読みやすい構成を作ることが重要です。アプリを利用して各セクションの文字数を把握することで、効果的な内部構造が実現できます。</p>
            </li>
          </ul>
          <h3 className="text-lg mb-2 font-bold mt-4">4. コピーライティングとマーケティング戦略での利用</h3>
          <ul className="list-disc pl-5 mb-4">
            <li>ブランドメッセージの最適化
              <p className="ml-5">広告キャンペーンやプロモーション活動では、キャッチコピーの文字数が重要な要素となります。短くても強いインパクトを与えるコピーを作成するために、文字数カウントアプリで精密に調整が行えます。</p>
            </li>
            <li>資料作成やプレゼンテーション
              <p className="ml-5">マーケティング資料やプレゼンテーション資料において、情報を簡潔にまとめる必要がある場合に、文字数カウントアプリを利用することで、余計な情報を削ぎ落とし、要点が明確な資料作成が可能になります。</p>
            </li>
          </ul>
          <p className="mt-4">以上のような活用事例により、文字数カウントアプリはライティング、SNS投稿、SEO対策、マーケティングなど、さまざまな分野での業務効率化に貢献しています。各シーンに合わせた使い方を工夫することで、より効果的な情報発信が実現できるでしょう。</p>
        </div>

        <div className="bg-gray-700 p-6 rounded-lg mt-6">
          <h2 className="text-xl mb-4 text-center">文字数カウントアプリの選び方とポイント</h2>
          <p className="mb-4">文字数カウントアプリを選ぶ際には、使いやすさや正確性だけでなく、利用目的に応じた機能やサポート体制も重要なポイントとなります。以下に、選定時に注目すべき具体的なポイントをまとめました。</p>
          <h3 className="text-lg mb-2 font-bold">正確な文字数計測機能</h3>
          <p className="mb-4">まず最も重要なのは、入力したテキストの文字数を正確に計算できるかどうかです。全角・半角の違いや特殊文字の扱いに対応しているかを確認し、誤差が出ないアプリを選ぶことが大切です。利用シーンによっては、単語数や行数、スペースや記号のカウントも求められる場合があるため、追加の統計情報が提供されるかどうかもチェックしましょう。</p>
          <h3 className="text-lg mb-2 font-bold mt-4">使いやすいユーザーインターフェース</h3>
          <p className="mb-4">初心者でも直感的に操作できるシンプルなデザインが採用されているかどうかを確認します。操作方法が分かりやすく、必要な情報にすぐアクセスできるレイアウトになっているアプリは、日常的に利用する際にストレスが少なく、作業効率を高めます。</p>
          <h3 className="text-lg mb-2 font-bold mt-4">多言語対応とカスタマイズ性</h3>
          <p className="mb-4">日本語だけでなく、英語やその他の言語にも対応しているかどうかもポイントとなります。また、ユーザーの用途に合わせて設定をカスタマイズできるかどうか、例えば特定の記号や改行の扱いを調整できる機能があるかも確認しましょう。</p>
          <h3 className="text-lg mb-2 font-bold mt-4">連携機能やエクスポート機能</h3>
          <p className="mb-4">他の執筆ツールやCMS（コンテンツ管理システム）との連携が可能な場合、作業の効率が向上します。例えば、作成したテキストを直接コピー＆ペーストできたり、CSVやPDF形式でエクスポートできたりする機能があると便利です。</p>
          <h3 className="text-lg mb-2 font-bold mt-4">料金体系とコストパフォーマンス</h3>
          <p className="mb-4">無料で使えるアプリも多く存在しますが、有料版であれば追加機能や優先サポートが受けられる場合があります。自分の利用目的や予算に合わせて、無料版と有料版の機能の違いやコストパフォーマンスを比較することが重要です。</p>
          <h3 className="text-lg mb-2 font-bold mt-4">定期的なアップデート状況</h3>
          <p className="mb-4">トラブルが発生した際や、新機能を求める場合に、迅速に対応してくれるサポート体制が整っているか確認しましょう。また、定期的なアップデートが行われ、セキュリティ面や機能面での改善が継続的に実施されているかも選定のポイントとなります。</p>
          <p className="mt-4">これらのポイントを踏まえて、自分の利用シーンやニーズに最も適した文字数カウントアプリを選ぶことで、文章作成やコンテンツ管理の効率化が実現できます。複数のアプリを試用し、比較検討することもおすすめします。</p>
        </div>
      </main>

      <div className="fixed bottom-20 right-4 z-50">
        <button
          onClick={handleCopy}
          className="bg-purple-500 text-white p-4 rounded-full shadow-lg hover:bg-purple-600 transition-colors flex items-center gap-2"
          title="テキストをコピー"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" 
            />
          </svg>
        </button>
      </div>

      {showToast && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg z-50">
          コピーしました！
        </div>
      )}

      <footer className="bg-gray-900 text-center py-6 mt-10">
        <div className="w-12 h-12 bg-black rounded-full mx-auto flex items-center justify-center">
          <span className="text-white font-bold">Boring.</span>
        </div>
        <p className="text-gray-400 mt-2">&copy; Boring Inc</p>
      </footer>
    </div>
  )
}