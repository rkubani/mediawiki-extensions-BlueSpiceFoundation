<?php

class BSApiTestCase extends ApiTestCase {

	/**
	 *
	 * @var BSUserFixtures
	 */
	protected static $userFixtures = null;

	/**
	 *
	 * @param BSUserFixtures $userFixtures
	 */
	public function setUserFixture( $userFixtures ) {
		static::$userFixtures = $userFixtures;
	}

	protected function setUp() {
		parent::setUp();

		if( static::$userFixtures instanceof BSUserFixtures ) {
			self::$users += static::$userFixtures->makeTestUsers();
		}
	}

	/**
	 * Making this public so we can make use of it from within a "*Fixtures"
	 * class
	 * @param string $pageName
	 * @param string $text
	 */
	public function insertPage( $pageName, $text = 'Sample page for unit test.', $namespace = NULL ) {
		return parent::insertPage( $pageName, $text, $namespace );
	}
}

