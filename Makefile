serve-docs:
	cd docs/source/ && bundle exec middleman server

build-docs:
	cd docs/source/ && bundle exec middleman build && cd ../../ && sh ./build_docs.sh