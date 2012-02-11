VENDOR_PATH := vendor/

BOOTSTRAP_DOWNLOAD := http://twitter.github.com/bootstrap/assets/bootstrap.zip
BOOTSTRAP_PATH     := $(VENDOR_PATH)bootstrap/

.PHONY: default install-dependencies install-bootstrap

default:
	@echo 'No default $(MAKE) target configured.'
	@exit 1

install-dependencies: install-bootstrap

install-bootstrap:
	$(eval BOOTSTRAP_TMP := /tmp/$(shell basename $(BOOTSTRAP_DOWNLOAD)))
	@curl -so "$(BOOTSTRAP_TMP)" "$(BOOTSTRAP_DOWNLOAD)"
	@if [ -d "$(BOOTSTRAP_PATH)" ]; then \
		rm -Rf "$(BOOTSTRAP_PATH)" ; \
	fi
	@mkdir -p "$(VENDOR_PATH)"
	@unzip -qq "$(BOOTSTRAP_TMP)" -d "$(VENDOR_PATH)"
	@for icons in 'glyphicons-halflings.png' 'glyphicons-halflings-white.png'; do \
		sed -e "s#../img/$${icons}#'data:image/png;base64,$$( base64 -w0 "$(BOOTSTRAP_PATH)img/$${icons}" )'#" -i "$(BOOTSTRAP_PATH)css/bootstrap.min.css" ; \
	done
	@for alias in 'css > styles' 'img > images' 'js > scripts'; do \
		mv "$(BOOTSTRAP_PATH)$${alias%% > *}" "$(BOOTSTRAP_PATH)$${alias##* > }" ; \
	done
	@for merge in 'styles/bootstrap-responsive.min.css > styles/bootstrap.min.css'; do \
		source="$(BOOTSTRAP_PATH)$${merge%% > *}" ; \
		target="$(BOOTSTRAP_PATH)$${merge##* > }" ; \
		echo           >> "$$target" ; \
		cat "$$source" >> "$$target" ; \
		rm  "$$source" ; \
	done
	@for garbage in 'images' 'scripts/bootstrap.js' 'styles/bootstrap.css' 'styles/bootstrap-responsive.css'; do \
		rm -R "$(BOOTSTRAP_PATH)$${garbage}" ; \
	done
	@echo "$(BOOTSTRAP_DOWNLOAD) successfully installed in $(BOOTSTRAP_PATH)."
